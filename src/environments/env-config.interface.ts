// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  ApiUrl: string;
  production: boolean;
  ENV?: string;
  VERSION?: string;
}
