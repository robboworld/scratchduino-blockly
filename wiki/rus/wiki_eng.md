Scratchduino-Blockly

'''Scratchduino-Blockly''' - development environment, allowing you to control your ScratchDuino robot
right from your web browser using Blockly programming language.

== Installation ==

Before we get started, you should follow some simple steps to install necessary software:

=== Windows ===
# Download and install robot drivers (//ссылка на статью http://wiki.scratchduino.ru/wiki/%D0%A0%D0%BE%D0%B1%D0%BE%D1%82%D0%BE%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%D0%B0_%D1%81_%D0%BF%D0%B5%D0%BB%D0%B5%D0%BD%D0%BE%D0%BA/%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0_%D0%9F%D0%9E) для Arduino (если они еще не установлены).
# Download and run installer (//ссылка) Scratchduino-Blockly.
# Ifter installation - click on ScratchDuino-Blockly shortcut on your desktip.
=== Linux ===
# Download archive ScratchDuino-Blockly_x??.tar.gz (depending on your system type (32 or 64 bit))
# Распаковать его (tar -xzvf ScratchDuino-Blockly_x??.tar.gz)
# Open folder ScratchDuino-Blockly_x?? and execute run.sh
=== Mac ===
# Download disc image ScratchDuino-Blockly.dmg and mount it (double-clicking on it)
# In opened folder execute run.command (using double-click)

​== Main workspace ==

Main workspace contains 5 basic parts: (//картинка Main Workspace Numered RUS)

# '''"Program" tab'''. Program editor, in which you can create robot-controlling algorithms using Blockly`s blocks.
# '''"Scene"'''. Living area for virtual robot.
# '''Control panel'''. Contains buttons for setting up and running robot and it`s controlling program.
# '''Sensor panel'''. Reflects values from robot`s sensors during execution.
# '''Menu'''. You can use it for saving/loading your programs and, also, to choose interface language.

== Your first Blockly program ==

After the following installation steps ScratchDuino-Blockly should open in your default browser.
You can open it in other browser just by copy-pasting address from address bar and hitting Enter.
Now you can start programming!

=== Robot connecting ===

First, you should make sure, that your Scratchduino robot is on and correctly installed
(this is needed only if you want to use real robot). To do this, connect your robot to computer using USB-cable
or Bluetooth, and then click the grey button says "Port is not chosen". Then, list of available on your computer
COM-ports should appear (It may contain more than one port) (//картинка Ports RUS). After selecting port,
click "Run" button. If selected port is not the one robot is connected, there are warning should appear (//картинка Port Error RUS)
- in that case, repeat all previous actions, but select another port. If selection was made right, no warnings appear,
and values from robot sensors at the Sensor panel should start changing. Now you can stop executing using "Step execution"
button and follow to the next step.

=== Blockly language ===

Blockly is very similar to Scratch - programs in it alse made from blocks, each representing some action or operation.
It has blocks for controlling robot`s engine, getting data from sensors, creating cycles, if-then-else operators,
math operations etc. But Blockly has some particular qualities, that must be considered during programming:

* Block`s order matters! Blocks are executing consequentially top-to-bottom, so, for example, you should program
button event handlers primarily.
* Control signal to robot engine discards effect of previous such signal, so,
you should make cycles and conditional operators, and, especially, their combinations, very carefully.
* Block "while program is running" cyclically repeats action, placed inside, until user press stop button.
User must ensure that actions inside this block don`t interrupt other robot controlling signal inside a program.

=== Virtual robot (sprite) ===

Sprite repeats movements of real robot in the "Scene" area. You can use it to debug your algorithms in the absence
of real Scratchduino. In case of crossing the borser of scene, sprite appears at the other side, so,
 you can`t "lose" it".

=== "Square" program ===

Create simple program, shown on the picture (//картинка Square RUS). Click "Run" button and if
port was selected right, robot will drive along square. Note, that sprite repeated all the movements after
 real robot. In case that Scratchduino does not connected, you wil see a warning and program will be executed only for sprite.

=== Control panel ===

You can control execution of a program using "Run", "Stop execution" and "Port is not chosen" buttons.
We described port seelcting button in previous sections.
After the execution of program, all blocks at "Program" area will be executed once, after that, program will either
 finish remaining cycles(if exists), or finish the execution and will just continue updating sensor values.
You can determine if program is runnning by green color of "Run" button. After changing the program, you should
 re-run execution(it does not necessarily to stop process using "Stop execution").
"Stop execution" button interrupts execution of program and stops robot, so, you can use it for force stop.

=== Saving and loading ===

"Program" in the top right corner gives you the ability to save sketches(Blockly programs in other words) on your local
 computer in ".blocks" extencion and load previously saved programs. "New" button will clear current editor window,
 advising you to save current sketch first.