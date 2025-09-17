class ClientLogger {
  isDevelopment = false;
  isProduction = true;
  shouldLog(level) {
    if (level === "error") return true;
    return this.isDevelopment;
  }
  formatMessage(level, message, context) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    if (context && Object.keys(context).length > 0) {
      return `${prefix} ${message} ${JSON.stringify(context, null, 2)}`;
    }
    return `${prefix} ${message}`;
  }
  debug(message, context) {
    if (this.shouldLog("debug")) {
      console.log(this.formatMessage("debug", message, context));
    }
  }
  info(message, context) {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", message, context));
    }
  }
  warn(message, context) {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", message, context));
    }
  }
  error(message, context) {
    if (this.shouldLog("error")) {
      console.error(this.formatMessage("error", message, context));
    }
  }
  // Convenience method for component lifecycle logging
  component(componentName, action, context) {
    this.debug(`[${componentName}] ${action}`, context);
  }
  // Convenience method for animation/sequence logging
  animation(animationName, step, context) {
    this.debug(`🎯 [${animationName}] ${step}`, context);
  }
}
const clientLogger = new ClientLogger();
const { debug, info, warn, error, component, animation } = clientLogger;

export { clientLogger as c };
