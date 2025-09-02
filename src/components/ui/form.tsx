import * as React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  className?: string;
  onSubmit: (values: TFieldValues) => void | Promise<void>;
  children: React.ReactNode;
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  form,
  className = "",
  onSubmit,
  children,
}: FormProps<TFieldValues>) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={className} noValidate>
      {children}
    </form>
  );
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormItem({ className = "", ...props }: FormItemProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FormLabel({ className = "", ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-neon-lime/90",
        "block mb-1",
        className
      )}
      {...props}
    />
  );
}

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function FormControl({ className = "", ...props }: FormControlProps) {
  return <div className={cn("grid w-full items-center", className)} {...props} />;
}

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormMessage({ className = "", ...props }: FormMessageProps) {
  return (
    <p
      className={cn(
        "text-sm text-destructive mt-1",
        className
      )}
      role="alert"
      aria-live="polite"
      {...props}
    />
  );
}

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormDescription({ className = "", ...props }: FormDescriptionProps) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}


