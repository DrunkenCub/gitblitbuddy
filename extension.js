// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const git = require('simple-git/promise');
const gitbranch = require('current-git-branch');
var path = require('path');
const exec = require('child_process').exec;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gitblitbuddy" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.blitPropose', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInputBox().then((value) => {
			if (value){
				git(vscode.workspace.workspaceFolders[0].uri.fsPath).pull().then((res)=>{
					vscode.window.showInformationMessage(res.summary.changes.toString());
				});
				let branchUri = 'HEAD:refs/for/'+ value.toString(); 
				exec('git push origin '+ branchUri, {cwd: vscode.workspace.workspaceFolders[0].uri.fsPath}, (error, stdout, stderr) => {
					console.log(stdout.length > 1 ? stdout: stderr);
					vscode.window.showInformationMessage(stdout.length > 1 ? stdout: stderr);
				   });
			}
		});
	});

	context.subscriptions.push(disposable);
}


exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
