Set-Location $PSScriptRoot\..
$lines = Get-Content "src\utils\reportGenerator.ts"
$body = $lines[107..792] -join "`n"
[System.IO.File]::WriteAllText("src\utils\_report_body_fragment.txt", $body, [System.Text.UTF8Encoding]::new($false))
