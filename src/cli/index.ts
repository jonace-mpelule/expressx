#! /usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner, Spinner } from "nanospinner";

const argv = yargs(hideBin(process.argv)).argv;

// Track active spinner globally
let activeSpinner: Spinner | null = null;

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  if (activeSpinner) {
    activeSpinner.stop({ text: "Process interrupted", mark: "💥" });
  }
  console.log(chalk.redBright.bold("\n❌ Process interrupted (Ctrl+C)"));
  process.exit(0);
});

async function main() {
  const firstArg = (argv as any)._[0];
  const secondArg = (argv as any)._[1];

  if (firstArg == "init") {
    await init();
  } else if (firstArg == "add" && secondArg == "route") {
    addRoute();
  } else {
    process.exit(1);
  }
}

async function addRoute() {
  console.log(chalk.green("Adding route..."));
}

async function init() {
  let projectName = (argv as any)._[1];
  let template = (argv as any)._[2];
  let installDependencies = (argv as any)._[3];

  if (!projectName) {
    const result = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
      },
    ]);
    projectName = result.projectName;
  }

  if (!template) {
    const result = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: "What template would you like to use?",
        choices: [
          {
            name: "Basic - Minimal Express setup with TS",
            value: "basic",
          },
          {
            name: "CRUD API - With validation and error handling",
            value: "crud-api",
          },
          {
            name: "Auth API - JWT auth, login & register",
            value: "auth-api",
          },
          {
            name: "Modular API - Feature-first folder structure",
            value: "modular-api",
          },
          {
            name: "Swagger API - Auto docs with OpenAPI",
            value: "swagger-api",
          },
        ],
      },
    ]);
    template = result.template;
  }

  if (!installDependencies) {
    const result = await inquirer.prompt([
      {
        type: "confirm",
        name: "installDependencies",
        message: "Would you like to install dependencies?",
        default: true,
      },
    ]);
    installDependencies = result.installDependencies;
  }

  console.log(
    chalk.green(
      `\n🚀 Creating project ${chalk.cyan(
        projectName
      )} with template ${chalk.yellow(template)}\n`
    )
  );

  // Simulate spinner step (safe exit aware)
  activeSpinner = createSpinner("Scaffolding your project...").start();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
  activeSpinner.success({ text: "Project scaffolded!" });
  activeSpinner = null;

  if (installDependencies) {
    activeSpinner = createSpinner("Installing dependencies...").start();
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate install
    activeSpinner.success({ text: "Dependencies installed!" });
    activeSpinner = null;
  }

  console.log(chalk.greenBright("\n✅ All done! Happy coding!\n"));
}

await main();
