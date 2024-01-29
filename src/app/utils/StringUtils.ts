export class StringUtils {

  public static isEmpty(value: any): boolean {
    return value === null || value === undefined || value.toString() === '';
  }
}
