$ErrorActionPreference = "Continue"
$env:CHROME_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$SITE = "https://muskan-choudhary.vercel.app"
$out  = Join-Path $env:TEMP "lh"
New-Item -ItemType Directory -Force -Path $out | Out-Null

$pages = [ordered]@{
  "home"        = "/"
  "about"       = "/about"
  "contact"     = "/contact"
  "projects"    = "/projects"
  "case-study"  = "/projects/covid19-pandemic-analysis"
}

$results = @()
foreach ($k in $pages.Keys) {
  $url  = $SITE + $pages[$k]
  $json = Join-Path $out "$k.json"
  Write-Output "running lighthouse: $k -> $url"
  npx --yes lighthouse $url `
    --output=json --output-path="$json" `
    --only-categories=performance,accessibility,best-practices,seo `
    --chrome-flags="--headless=new --disable-gpu --no-sandbox" `
    --quiet
  if (Test-Path $json) {
    try {
      $r = Get-Content $json -Raw | ConvertFrom-Json
      $results += [pscustomobject]@{
        Page     = $k
        Perf     = [math]::Round($r.categories.performance.score * 100)
        A11y     = [math]::Round($r.categories.accessibility.score * 100)
        SEO      = [math]::Round($r.categories.seo.score * 100)
        Practices= [math]::Round($r.categories."best-practices".score * 100)
        FCP      = [math]::Round($r.audits."first-contentful-paint".numericValue)
        LCP      = [math]::Round($r.audits."largest-contentful-paint".numericValue)
        CLS      = [math]::Round($r.audits."cumulative-layout-shift".numericValue, 3)
        TBT      = [math]::Round($r.audits."total-blocking-time".numericValue)
        SizeKB   = [math]::Round($r.audits."total-byte-weight".numericValue / 1KB)
      }
    } catch { Write-Output "  parse failed: $($_.Exception.Message)" }
  } else {
    Write-Output "  no report produced for $k"
  }
}

Write-Output ""
Write-Output "================ LIGHTHOUSE RESULTS ================"
$results | Format-Table -AutoSize

$fail = $results | Where-Object { $_.Perf -lt 95 -or $_.A11y -lt 95 -or $_.SEO -lt 95 -or $_.Practices -lt 95 }
if ($fail) {
  Write-Output "TARGET >=95 NOT MET ON:"
  $fail | Format-Table -AutoSize
} else {
  Write-Output "ALL PAGES >= 95 IN EVERY CATEGORY"
}
