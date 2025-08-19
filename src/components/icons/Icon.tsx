import { 
	Menu, X, ChevronRight, ArrowRight, ExternalLink, Mail, Phone,
	Briefcase, Monitor, Code, Palette, Linkedin, Instagram, Github,
	Play, Image, Video, Check, Info, Clock, Calendar, GraduationCap, Award
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

const iconMap = {
	Menu,
	X,
	ChevronRight,
	ArrowRight,
	ExternalLink,
	Mail,
	Phone,
	Briefcase,
	Monitor,
	Code,
	Palette,
	Linkedin,
	Instagram,
	Github,
	Play,
	Image,
	Video,
	Check,
	Info,
	Clock,
	Calendar,
	GraduationCap,
	Award,
};

export function Icon({
	name,
	size = 'md',
	className = '',
	'aria-label': ariaLabel,
	'aria-hidden': ariaHidden = false,
	...props
}: IconProps) {
	const IconComponent = iconMap[name as keyof typeof iconMap];

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
export const MenuIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Menu" {...props} />;
export const CloseIcon = (props: Omit<IconProps, 'name'>) => <Icon name="X" {...props} />;
export const ChevronRightIcon = (props: Omit<IconProps, 'name'>) => <Icon name="ChevronRight" {...props} />;
export const ArrowRightIcon = (props: Omit<IconProps, 'name'>) => <Icon name="ArrowRight" {...props} />;
export const ExternalLinkIcon = (props: Omit<IconProps, 'name'>) => <Icon name="ExternalLink" {...props} />;
export const MailIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Mail" {...props} />;
export const PhoneIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Phone" {...props} />;
export const BriefcaseIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Briefcase" {...props} />;
export const MonitorIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Monitor" {...props} />;
export const CodeIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Code" {...props} />;
export const PaletteIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Palette" {...props} />;
export const LinkedInIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Linkedin" {...props} />;
export const InstagramIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Instagram" {...props} />;
export const GitHubIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Github" {...props} />;
export const PlayIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Play" {...props} />;
export const ImageIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Image" {...props} />;
export const VideoIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Video" {...props} />;
export const GalleryIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Image" {...props} />;
export const CheckIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Check" {...props} />;
export const XIcon = (props: Omit<IconProps, 'name'>) => <Icon name="X" {...props} />;
export const InfoIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Info" {...props} />;
export const ClockIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Clock" {...props} />;
export const CalendarIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Calendar" {...props} />;
export const GraduationIcon = (props: Omit<IconProps, 'name'>) => <Icon name="GraduationCap" {...props} />;
export const AwardIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Award" {...props} />;
