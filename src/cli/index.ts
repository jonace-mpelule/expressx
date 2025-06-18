#! /usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from "nanospinner"
const argv = yargs(hideBin(process.argv)).argv;


process.on("SIGINT", () => {
    console.log(chalk.redBright.bold("\n Process interrupted (Ctrl+C)"));
    process.exit(0);
});

async function main() {
    const firstArg = (argv as any)._[0];
    if (firstArg == "init") {
        init();
    } else {
        console.log(chalk.red("Invalid command"));
    }

}

async function init() {
    let projectName = (argv as any)._[1];
    let template = (argv as any)._[2];
    let installDependencies = (argv as any)._[3];
    if (!projectName) {
        const result = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'What is your project name?',
                },
            ])
        projectName = result.projectName;


    }

    if (!template) {
        const result = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'template',
                    message: 'What template would you like to use?',
                    choices: ['Scaffold (BareBones)', 'Todolist (CRUD)', 'Production Backend'],
                },
            ])
        template = result.template;
    }

    if (!installDependencies) {
        const result = await inquirer
            .prompt([
                {
                    type: 'confirm',
                    name: 'installDependencies',
                    message: 'Would you like to install dependencies?',
                    default: true,
                },
            ])
        installDependencies = result.installDependencies;
    }

    console.log(`Creating project ${projectName} with template ${template}`);

}


await main()