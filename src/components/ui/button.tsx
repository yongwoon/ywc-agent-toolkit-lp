import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode
} from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  block?: boolean;
  disabled?: boolean;
};

type AnchorButtonProps = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string;
  };

type NativeButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined;
  };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-[var(--text-on-accent)] shadow-[var(--edge-top)] hover:bg-accent-hover motion-safe:hover:shadow-[var(--glow-accent)]",
  secondary:
    "border-border-subtle bg-surface-raised text-text-bright shadow-[var(--edge-top)] hover:border-border hover:bg-[var(--surface-raised-hover)]",
  outline:
    "border-border bg-transparent text-text-bright hover:border-accent hover:bg-[var(--accent-tint)] hover:text-accent",
  ghost:
    "border-transparent bg-transparent text-text-secondary hover:bg-[var(--accent-tint)] hover:text-accent"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-[var(--control-h-sm)] px-3 text-[var(--text-mono-sm)]",
  md: "h-[var(--control-h)] px-4 text-[var(--text-mono)]",
  lg: "h-[var(--control-h-lg)] px-5 text-[var(--text-mono-lg)]"
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const {
    variant = "secondary",
    size = "md",
    icon,
    iconRight,
    block = false,
    disabled = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cx(
    "inline-flex items-center justify-center gap-2 rounded-sm border font-mono font-semibold leading-none tracking-[var(--ls-wide)] outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--dur-fast)] ease-out focus-visible:shadow-[var(--focus-ring)] motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
    sizeClasses[size],
    variantClasses[variant],
    block && "w-full",
    disabled && "pointer-events-none cursor-not-allowed opacity-55",
    className
  );

  const content = (
    <>
      {icon ? <span className="shrink-0 text-current">{icon}</span> : null}
      <span className="truncate">{children}</span>
      {iconRight ? (
        <span className="shrink-0 text-current">{iconRight}</span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const anchorProps = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof ButtonOwnProps
    >;

    return (
      <a
        {...anchorProps}
        aria-disabled={disabled || undefined}
        className={classes}
        href={disabled ? undefined : props.href}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
      >
        {content}
      </a>
    );
  }

  const buttonProps = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonOwnProps
  >;

  return (
    <button
      {...buttonProps}
      className={classes}
      disabled={disabled}
      type={buttonProps.type ?? "button"}
    >
      {content}
    </button>
  );
}
