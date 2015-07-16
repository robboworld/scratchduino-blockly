!include Sections.nsh
!define SHORTCUT_FOLDER "$SMPROGRAMS\ScratchDuino-Blockly"
!define NODEJS_FOLDER "$INSTDIR\nodeJS"


# define name of installer file
OutFile "ScratchDuinoBlocklyInstaller64.exe"
name "ScratchDuino-Blockly"
 
# define installation directory
InstallDir "C:\Program Files"
 
# For removing Start Menu shortcut in Windows 7
RequestExecutionLevel admin

#Page components
Page directory
Page instfiles
UninstPage uninstConfirm
UninstPage instfiles

Function .onInit
FunctionEnd

Section
    StrCpy $INSTDIR "$INSTDIR\ScratchDuino-Blockly"

    SetOutPath "${NODEJS_FOLDER}"
    File /a /r "files\x64\"
	#SetOutPath "$INSTDIR\node_modules"
    #File /a /r "\\?\C:\Users\Xottab\IdeaProjects\scratchduino-blockly\installerWin\files\node_modules\"

    SetOutPath "$INSTDIR\bin"
    File /a /r "..\bin\"
    SetOutPath "$INSTDIR\locales"
    File /a /r "..\locales\"
    SetOutPath "$INSTDIR\node_modules"
    File /a /r "..\node_modules\"

    SetOutPath "$INSTDIR\public"
    File /a  "..\public\favicon_new.ico"
    File /a /r "..\public\blockly"
    File /a /r "..\public\blockly_custom"
    File /a /r "..\public\bootstrap"
    File /a /r "..\public\css"
    File /a /r "..\public\html"
    File /a /r "..\public\img"
    File /a /r "..\public\plugins"
    File /a /r "..\public\scripts"
    File /a /r "..\public\serial"


    SetOutPath "$INSTDIR\public\flags\css"
    File /a /r "..\public\flags\css"
    SetOutPath "$INSTDIR\public\flags\flags\1x1"
    File /a  "..\public\flags\flags\1x1\en.svg"
    File /a  "..\public\flags\flags\1x1\ru.svg"
    SetOutPath "$INSTDIR\public\flags\flags\4x3"
    File /a  "..\public\flags\flags\1x1\en.svg"
    File /a  "..\public\flags\flags\1x1\ru.svg"



    SetOutPath "$INSTDIR\routes"
    File /a /r "..\routes\"
    SetOutPath "$INSTDIR\views"
    File /a /r "..\views\"
    SetOutPath $INSTDIR
    File /a  "..\app.js"
    File /a  "..\package.json"
    File /a  ".\run.bat"
    #File /a  ".\compile.bat"
	
	# compile	
	#ExecWait compile.bat

    # create the uninstaller
    WriteUninstaller "$INSTDIR\uninstall.exe"

    # create a shortcut named "new shortcut" in the start menu programs directory
    # point the new shortcut at the program uninstaller
    CreateDirectory  "${SHORTCUT_FOLDER}"
    CreateShortCut "${SHORTCUT_FOLDER}\Uninstall ScratchDuino-Blockly.lnk" "$INSTDIR\uninstall.exe"
    CreateShortCut "$DESKTOP\ScratchDuino-Blockly.lnk" "$INSTDIR\run.bat" "" "$INSTDIR\public\favicon_new.ico" 0
    CreateShortCut "${SHORTCUT_FOLDER}\ScratchDuino-Blockly.lnk" "$INSTDIR\run.bat" "" "$INSTDIR\public\favicon_new.ico" 0


SectionEnd

# start default section
#Section "NodeJS (install if you don`t have one)"
 #
#SectionEnd

# uninstaller section start
Section "un.Uninstaller"
 
    # first, delete the uninstaller
    RMDir /r "\\?\${NODEJS_FOLDER}\"
    Delete "$INSTDIR\uninstall.exe"
    RMDir /r "$INSTDIR\bin\"
    RMDir /r "$INSTDIR\locales\"
    RMDir /r "\\?\$INSTDIR\node_modules\"
    RMDir /r "$INSTDIR\public\"
    RMDir /r "$INSTDIR\routes\"
    RMDir /r "$INSTDIR\views\"
    Delete "$INSTDIR\app.js"
    Delete "$INSTDIR\run.bat"
    Delete "$INSTDIR\compile.bat"
    Delete "$INSTDIR\package.json"
    Delete "$DESKTOP\ScratchDuino-Blockly.lnk"

    # second, remove the link from the start menu
    RMDir /r "${SHORTCUT_FOLDER}"
 
# uninstaller section end
SectionEnd