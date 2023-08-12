import chalk from 'chalk';
import { formatISO9075 } from 'date-fns';
export default class Logger {
  public static info(args: any) {
    console.log(
      chalk.blue(`[${formatISO9075(new Date())}] [ INFO ] `),
      typeof args == 'string' ? chalk.blue(args) : args
    );
  }
  public static warn(args: any) {
    console.log(
      chalk.yellow(`[${formatISO9075(new Date())}] [ WARN ] `),
      typeof args == 'string' ? chalk.yellow(args) : args
    );
  }

  public static error(args: any) {
    console.log(
      chalk.red(`[${formatISO9075(new Date())}] [ ERROR ] `),
      typeof args == 'string' ? chalk.red(args) : args
    );
  }
}
