$socket = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, 0)
$socket.Start()
$port = $socket.LocalEndpoint.Port
$socket.Stop()

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
    Write-Host "Server started on http://localhost:$port/"
    [Console]::Out.Flush()
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/api/generate" -and $request.HttpMethod -eq "POST") {
            $apiKey = [System.Environment]::GetEnvironmentVariable("GEMINI_API_KEY")
            if ([string]::IsNullOrEmpty($apiKey)) {
                $apiKey = $env:GEMINI_API_KEY
            }
            if ([string]::IsNullOrEmpty($apiKey)) {
                $configPath = Join-Path "c:\Users\aadit\.gemini\antigravity\scratch\ai-travel-planner" "config.json"
                if (Test-Path $configPath) {
                    try {
                        $config = Get-Content $configPath | ConvertFrom-Json
                        $apiKey = $config.GEMINI_API_KEY
                    }
                    catch {}
                }
            }

            if ([string]::IsNullOrEmpty($apiKey)) {
                $response.StatusCode = 500
                $buf = [System.Text.Encoding]::UTF8.GetBytes('{"error": {"message": "Gemini API Key is not configured on the server. Please set the GEMINI_API_KEY environment variable or create a config.json file in the root."}}')
                $response.ContentType = "application/json"
                $response.OutputStream.Write($buf, 0, $buf.Length)
                $response.Close()
                continue
            }

            $reader = New-Object System.IO.StreamReader($request.InputStream)
            $reqBody = $reader.ReadToEnd()
            $reader.Close()

            try {
                $geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=$apiKey"
                $client = New-Object System.Net.Http.HttpClient
                $content = New-Object System.Net.Http.StringContent($reqBody, [System.Text.Encoding]::UTF8, "application/json")
                $postTask = $client.PostAsync($geminiUrl, $content)
                $postTask.Wait()
                $apiResponse = $postTask.Result

                $response.StatusCode = [int]$apiResponse.StatusCode
                $readTask = $apiResponse.Content.ReadAsByteArrayAsync()
                $readTask.Wait()
                $resBytes = $readTask.Result

                $response.ContentType = "application/json"
                $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            }
            catch {
                $response.StatusCode = 500
                $errMsg = $_.Exception.Message
                if ($_.Exception.InnerException) { $errMsg += " - " + $_.Exception.InnerException.Message }
                $buf = [System.Text.Encoding]::UTF8.GetBytes('{"error": {"message": "Backend proxy error: ' + $errMsg.Replace('"', '\"') + '"}}')
                $response.ContentType = "application/json"
                $response.OutputStream.Write($buf, 0, $buf.Length)
            }
            $response.Close()
            continue
        }
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        $urlPath = [Uri]::UnescapeDataString($urlPath)
        $filePath = Join-Path "c:\Users\aadit\.gemini\antigravity\scratch\ai-travel-planner" $urlPath.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "application/octet-stream"
            if ($ext -eq ".html" -or $ext -eq ".htm") { $contentType = "text/html; charset=utf-8" }
            elseif ($ext -eq ".css") { $contentType = "text/css" }
            elseif ($ext -eq ".js") { $contentType = "application/javascript" }
            elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
            elseif ($ext -eq ".png") { $contentType = "image/png" }
            elseif ($ext -eq ".svg") { $contentType = "image/svg+xml" }
            elseif ($ext -eq ".json") { $contentType = "application/json" }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        else {
            $response.StatusCode = 404
            $buf = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($buf, 0, $buf.Length)
        }
        $response.Close()
    }
}
catch {
    Write-Error $_
}
finally {
    $listener.Close()
}
