# Motion Library Guide

## Overview
This project uses **Motion** (the successor to framer-motion) for React-based animations. Motion provides better performance and cross-framework support than the legacy framer-motion library.

## Installation
```bash
pnpm add motion
```

## Usage in React Components

### Basic Import
```typescript
import { motion } from 'motion/react';
```

### Example Component
```typescript
import { motion } from 'motion/react';

export default function AnimatedCard({ title, description }: Props) {
  return (
    <motion.div
      className="p-6 bg-card border border-border rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1] // Tailwind's default easing
      }}
      whileHover={{ scale: 1.02 }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
}
```

## Best Practices

### 1. Respect Motion Preferences
Always check for reduced motion preferences:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationConfig = prefersReducedMotion 
  ? { duration: 0 } 
  : { duration: 0.6 };
```

### 2. Use Tailwind Easing
Match your existing design system:
```typescript
// Tailwind's default easing
ease: [0.4, 0, 0.2, 1]

// Or use predefined curves
ease: "easeOut"
```

### 3. Performance Considerations
- Keep animations under 300ms for UI feedback
- Use `transform` and `opacity` for smooth animations
- Avoid animating layout properties like `width`, `height`

### 4. Accessibility
- Provide alternative content for users with motion sensitivity
- Use `aria-live` for dynamic content updates
- Ensure animations don't interfere with screen readers

## Common Animation Patterns

### Fade In
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Slide Up
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content
</motion.div>
```

### Staggered Children
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item, index) => (
    <motion.div key={index} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## Integration with Astro

### React Islands
Use `client:load` for immediate hydration:
```astro
---
import AnimatedComponent from '../components/AnimatedComponent';
---

<AnimatedComponent client:load title="Animated Title" />
```

### Lazy Loading
Use `client:visible` for performance:
```astro
<AnimatedComponent client:visible title="Lazy Loaded" />
```

## Troubleshooting

### Common Issues
1. **Animations not working**: Ensure component is properly hydrated
2. **Performance issues**: Check for layout thrashing, use `will-change: transform`
3. **Accessibility**: Test with screen readers and reduced motion

### Debug Mode
Enable debug mode in development:
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  onAnimationStart={() => console.log('Animation started')}
  onAnimationComplete={() => console.log('Animation completed')}
>
  Debug Content
</motion.div>
```

## Resources
- [Motion Documentation](https://motion.dev/)
- [Motion React Guide](https://motion.dev/motion/guide-upgrade/)
- [Animation Best Practices](https://motion.dev/motion/guide-animation-best-practices/)
