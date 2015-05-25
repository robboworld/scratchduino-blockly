!include Sections.nsh
!define SHORTCUT_FOLDER "$SMPROGRAMS\ScratchDuino-Blockly"
!define NODEJS_FOLDER "$INSTDIR\nodeJS"


# define name of installer file
OutFile "ScratchDuinoBlocklyInstaller.exe"
name "ScratchDuino-Blockly"
 
# define installation directory
InstallDir $DESKTOP
 
# For removing Start Menu shortcut in Windows 7
RequestExecutionLevel user

#Page components
Page directory
Page instfiles
UninstPage uninstConfirm
UninstPage instfiles



Section
    SetOutPath "${NODEJS_FOLDER}"
    File /a /r "files\node.exe"

    SetOutPath "$INSTDIR\bin"
    File /a /r "..\bin\"
    SetOutPath "$INSTDIR\locales"
    File /a /r "..\locales\"
    SetOutPath "$INSTDIR\node_modules"
    File /a /r "\\?\C:\Users\Xottab\IdeaProjects\scratchduino-blockly\node_modules\"
    SetOutPath "$INSTDIR\public"
    File /a /r "..\public\"
    SetOutPath "$INSTDIR\routes"
    File /a /r "..\routes\"
    SetOutPath "$INSTDIR\thrash"
    File /a /r "..\thrash\"
    SetOutPath "$INSTDIR\views"
    File /a /r "..\views\"
    SetOutPath $INSTDIR
    File /a /r "..\app.js"
    File /a /r "..\package.json"
    File /a /r ".\run.bat"
    File /a /r ".\run_icon.ico"

    # create the uninstaller
    WriteUninstaller "$INSTDIR\uninstall.exe"

    # create a shortcut named "new shortcut" in the start menu programs directory
    # point the new shortcut at the program uninstaller
    CreateDirectory  "${SHORTCUT_FOLDER}"
    CreateShortCut "${SHORTCUT_FOLDER}\Uninstall ScratchDuino-Blockly.lnk" "$INSTDIR\uninstall.exe"
    CreateShortCut "$DESKTOP\ScratchDuino-Blockly.lnk" "$INSTDIR\run.bat" "" "$INSTDIR\run_icon.ico" 0
    CreateShortCut "${SHORTCUT_FOLDER}\ScratchDuino-Blockly.lnk" "$INSTDIR\run.bat" "" "$INSTDIR\run_icon.ico" 0
SectionEnd

# start default section
#Section "NodeJS (install if you don`t have one)"
 #
#SectionEnd

# uninstaller section start
Section "un.Uninstaller"
 
    # first, delete the uninstaller
    RMDir /r "${NODEJS_FOLDER}"
    Delete "$INSTDIR\uninstall.exe"
    RMDir /r "$INSTDIR\bin\"
    RMDir /r "$INSTDIR\locales\"
    RMDir /r "\\?\$INSTDIR\node_modules\"
    RMDir /r "$INSTDIR\public\"
    RMDir /r "$INSTDIR\routes\"
    RMDir /r "$INSTDIR\thrash\"
    RMDir /r "$INSTDIR\views\"
    Delete "$INSTDIR\app.js"
    Delete "$INSTDIR\run.bat"
    Delete "$INSTDIR\run_icon.ico"
    Delete "$INSTDIR\package.json"
    Delete "$DESKTOP\ScratchDuino-Blockly.lnk"

    # second, remove the link from the start menu
    RMDir /r "${SHORTCUT_FOLDER}"
 
# uninstaller section end
SectionEnd