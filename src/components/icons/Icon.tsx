import {
	Menu, X, ChevronRight, ArrowRight, ExternalLink, Mail, Phone,
	Briefcase, Monitor, Code, Palette,
	Play, Image, Video, Check, Info, Clock, Calendar, GraduationCap, Award,
	Linkedin, Instagram, Github, Globe, Bot,
	type LucideIcon,
} from 'lucide-react';

export interface IconProps {
	name: string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	className?: string;
	'aria-label'?: string;
	'aria-hidden'?: boolean | 'true' | 'false';
	'data-icon'?: string;
}

const sizeClasses = {
	xs: 'w-3 h-3',
	sm: 'w-4 h-4',
	md: 'w-5 h-5',
	lg: 'w-6 h-6',
	xl: 'w-8 h-8',
	'2xl': 'w-10 h-10',
};

export const iconMap: Record<string, LucideIcon> = {
	menu: Menu,
	x: X,
	chevronright: ChevronRight,
	arrowright: ArrowRight,
	externallink: ExternalLink,
	mail: Mail,
	phone: Phone,
	briefcase: Briefcase,
	monitor: Monitor,
	code: Code,
	palette: Palette,
	linkedin: Linkedin,
	instagram: Instagram,
	github: Github,
	play: Play,
	image: Image,
	video: Video,
	check: Check,
	info: Info,
	clock: Clock,
	calendar: Calendar,
	graduationcap: GraduationCap,
	award: Award,
	globe: Globe,
	bot: Bot,
};

export function Icon({
	name,
	size = 'md',
	className = '',
	'aria-label': ariaLabel,
	'aria-hidden': ariaHidden = false,
	...props
}: IconProps) {
	// Convert PascalCase to lowercase for consistency
	const iconKey = name.toLowerCase();
	const IconComponent = iconMap[iconKey];

	if (!IconComponent) {
		console.warn(`Icon "${name}" not found`);
		return null;
	}

	return (
		<IconComponent
			className={`${sizeClasses[size]} ${className}`.trim()}
			aria-label={ariaLabel}
			aria-hidden={ariaHidden || !ariaLabel}
			role={ariaLabel ? 'img' : undefined}
			{...props}
		/>
	);
}

// Export commonly used icons for convenience
export const MenuIcon = (props: Omit<IconProps, 'name'>) => <Icon name="menu" {...props} />;
export const CloseIcon = (props: Omit<IconProps, 'name'>) => <Icon name="x" {...props} />;
export const ChevronRightIcon = (props: Omit<IconProps, 'name'>) => <Icon name="chevronright" {...props} />;
export const ArrowRightIcon = (props: Omit<IconProps, 'name'>) => <Icon name="arrowright" {...props} />;
export const ExternalLinkIcon = (props: Omit<IconProps, 'name'>) => <Icon name="externallink" {...props} />;
export const MailIcon = (props: Omit<IconProps, 'name'>) => <Icon name="mail" {...props} />;
export const PhoneIcon = (props: Omit<IconProps, 'name'>) => <Icon name="phone" {...props} />;
export const BriefcaseIcon = (props: Omit<IconProps, 'name'>) => <Icon name="briefcase" {...props} />;
export const MonitorIcon = (props: Omit<IconProps, 'name'>) => <Icon name="monitor" {...props} />;
export const CodeIcon = (props: Omit<IconProps, 'name'>) => <Icon name="code" {...props} />;
export const PaletteIcon = (props: Omit<IconProps, 'name'>) => <Icon name="palette" {...props} />;
export const LinkedInIcon = (props: Omit<IconProps, 'name'>) => <Icon name="linkedin" {...props} />;
export const InstagramIcon = (props: Omit<IconProps, 'name'>) => <Icon name="instagram" {...props} />;
export const GitHubIcon = (props: Omit<IconProps, 'name'>) => <Icon name="github" {...props} />;
export const PlayIcon = (props: Omit<IconProps, 'name'>) => <Icon name="play" {...props} />;
export const ImageIcon = (props: Omit<IconProps, 'name'>) => <Icon name="image" {...props} />;
export const VideoIcon = (props: Omit<IconProps, 'name'>) => <Icon name="video" {...props} />;
export const GalleryIcon = (props: Omit<IconProps, 'name'>) => <Icon name="image" {...props} />;
export const CheckIcon = (props: Omit<IconProps, 'name'>) => <Icon name="check" {...props} />;
export const XIcon = (props: Omit<IconProps, 'name'>) => <Icon name="x" {...props} />;
export const InfoIcon = (props: Omit<IconProps, 'name'>) => <Icon name="info" {...props} />;
export const ClockIcon = (props: Omit<IconProps, 'name'>) => <Icon name="clock" {...props} />;
export const CalendarIcon = (props: Omit<IconProps, 'name'>) => <Icon name="calendar" {...props} />;
export const GraduationIcon = (props: Omit<IconProps, 'name'>) => <Icon name="graduationcap" {...props} />;
export const AwardIcon = (props: Omit<IconProps, 'name'>) => <Icon name="award" {...props} />;
export const GlobeIcon = (props: Omit<IconProps, 'name'>) => <Icon name="globe" {...props} />;
export const BotIcon = (props: Omit<IconProps, 'name'>) => <Icon name="bot" {...props} />;