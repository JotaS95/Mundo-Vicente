[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$urls = @(
  @("https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Embothrium_coccineum_-Notro.jpg/800px-Embothrium_coccineum_-Notro.jpg", "img/flora-notro.jpg"),
  @("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Moss_macro.jpg/800px-Moss_macro.jpg", "img/flora-musgos.jpg"),
  @("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Berberis_darwinii_1.jpg/800px-Berberis_darwinii_1.jpg", "img/flora-michay.jpg"),
  @("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Berberis_microphylla_5.jpg/800px-Berberis_microphylla_5.jpg", "img/flora-calafate.jpg"),
  @("https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Fragaria_vesca_berries_1.jpg/800px-Fragaria_vesca_berries_1.jpg", "img/flora-frutilla.jpg"),
  @("https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Fern-leaf.jpg/800px-Fern-leaf.jpg", "img/flora-helecho.jpg")
)
$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0")
foreach ($i in $urls) {
  try {
    Write-Host "Downloading $($i[1])"
    $wc.DownloadFile($i[0], (Join-Path $PWD $i[1]))
  } catch {
    Write-Host "Failed to download $($i[1]): $_"
  }
}
Write-Host "Done"
