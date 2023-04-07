# Define source and destination folders
$source = "C:\GithubFolder\smurfness.github.io"
$destination = "C:\Users\Kvothe\OneDrive\202X - Projets\Dev\Dev_Backup"

# Get the current date in the format yyyy-MM-dd
$dateString = Get-Date -Format "yyyy-MM-dd-hh-mm"

# Create a new folder in the backup folder with the current date as the name
$backupFolder = New-Item -ItemType Directory -Path "$destination\Dev_Portfolio_$dateString"

# Copy the source folder to the backup folder
Copy-Item $source $backupFolder.FullName -Recurse

# Start VS Code
Start-Process "C:\Users\Kvothe\AppData\Local\Programs\Microsoft VS Code\Code.exe"

# Pause the script to keep the PowerShell console open