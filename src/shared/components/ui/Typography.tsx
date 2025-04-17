import clsx from "clsx";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption";

type Color =
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "white"
  | "black"
  | "gradient";

interface TypographyProps {
  align?: "center" | "start" | "end";
  variant?: Variant;
  component?: React.ElementType;
  color?: Color;
  noWrap?: boolean;
  gutterBottom?: boolean;
  paragraph?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantMapping: Record<Variant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "p",
  subtitle2: "p",
  body1: "p",
  body2: "p",
  caption: "span",
};

const stylesMapper: Record<Variant, string> = {
  h1: "text-6xl font-bold leading-tight",
  h2: "text-5xl font-bold leading-normal",
  h3: "text-4xl font-bold leading-snug",
  h4: "text-3xl font-bold leading-relaxed",
  h5: "text-2xl font-bold leading-loose",
  h6: "text-xl font-bold leading-7",
  subtitle1: "text-lg font-semibold leading-8",
  subtitle2: "text-sm font-semibold leading-6",
  body1: "text-lg font-normal leading-6",
  body2: "text-sm font-normal leading-5",
  caption: "text-xs font-normal leading-relaxed",
};

export default function Typography({
  align = "start",
  variant = "body1",
  component: Component,
  color = "primary",
  noWrap = false,
  gutterBottom = false,
  paragraph = false,
  className = "",
  children,
  ...restProps
}: TypographyProps) {
  const alignmentMapping = {
    center: "text-center",
    start: "text-start",
    end: "text-end",
  };

  const isVariantTag = !!variant && !paragraph;

  const Tag = isVariantTag ? variantMapping[variant] : Component || "p";

  const classes = clsx(
    `text-${color}`,
    alignmentMapping[align],
    noWrap && "whitespace-nowrap",
    gutterBottom && "mb-2",
    className,
    stylesMapper[variant],
  );

  return (
    <Tag className={classes} {...restProps}>
      {children}
    </Tag>
  );
}
