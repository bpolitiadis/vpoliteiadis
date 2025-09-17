import { y as createVNode, F as Fragment, aL as __astro_tag_component__ } from './astro/server_oRAxjIhj.mjs';
import 'clsx';

const frontmatter = {
  "title": "Building the Casa Capoeira Portal: A Solo Dev’s Journey Into Code, Culture, and Craft",
  "description": "A solo developer’s journey building a production-ready, multilingual CMS for the global Capoeira community—balancing code, culture, and craft.",
  "excerpt": "How I designed and shipped a custom, multilingual CMS for Capoeira: tech choices, CMS design, i18n, media, registration, security, and the realities of building alone.",
  "coverImage": "/images/blog/casa-capoeira-cover.png",
  "author": "Vasileios Politeiadis",
  "tags": ["Next.js", "React", "Supabase", "PostgreSQL", "Prisma", "NextAuth", "TailwindCSS", "ShadCN", "Radix", "Zod", "Resend", "Vitest", "Playwright", "i18n", "CMS", "Capoeira", "Product", "Solo Developer"],
  "category": "development",
  "featured": false,
  "publishedAt": "2025-08-05",
  "readingTime": "12 min read",
  "seo": {
    "title": "Building the Casa Capoeira Portal: A Solo Dev’s Journey Into Code, Culture, and Craft - Vasileios Politeiadis",
    "description": "A solo developer’s story of building a production-ready, multilingual CMS for a global Capoeira community with Next.js, Supabase, Prisma, and more.",
    "keywords": ["Next.js", "React", "Supabase", "PostgreSQL", "Prisma", "NextAuth", "TailwindCSS", "ShadCN", "Radix", "Zod", "Resend", "Vitest", "Playwright", "i18n", "CMS", "Capoeira", "solo developer"]
  }
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "building-the-casa-capoeira-portal-a-solo-devs-journey-into-code-culture-and-craft",
    "text": "Building the Casa Capoeira Portal: A Solo Dev’s Journey Into Code, Culture, and Craft"
  }, {
    "depth": 2,
    "slug": "why-this-project-needed-to-exist",
    "text": "Why This Project Needed to Exist"
  }, {
    "depth": 2,
    "slug": "the-technology-stack--and-why-i-chose-it",
    "text": "The Technology Stack — and Why I Chose It"
  }, {
    "depth": 2,
    "slug": "the-cms-where-the-magic-happens",
    "text": "The CMS: Where the Magic Happens"
  }, {
    "depth": 3,
    "slug": "core-cms-features",
    "text": "Core CMS Features"
  }, {
    "depth": 3,
    "slug": "what-makes-it-different",
    "text": "What Makes It Different"
  }, {
    "depth": 2,
    "slug": "the-hardest-challenges-and-how-i-solved-them",
    "text": "The Hardest Challenges (and How I Solved Them)"
  }, {
    "depth": 3,
    "slug": "1-true-multilingual-architecturei18n",
    "text": "1. True Multilingual Architecturei18n"
  }, {
    "depth": 3,
    "slug": "2-media-uploads-without-painmedia",
    "text": "2. Media Uploads Without Painmedia"
  }, {
    "depth": 3,
    "slug": "3-event-registration-logic-that-adaptsevents",
    "text": "3. Event Registration Logic That Adaptsevents"
  }, {
    "depth": 3,
    "slug": "4-building-alone-means-owning-everything",
    "text": "4. Building Alone Means Owning Everything"
  }, {
    "depth": 2,
    "slug": "security-and-ops-my-invisible-work",
    "text": "Security and Ops: My Invisible Work"
  }, {
    "depth": 2,
    "slug": "reflections-as-a-solo-developer",
    "text": "Reflections as a Solo Developer"
  }, {
    "depth": 2,
    "slug": "final-thoughts",
    "text": "Final Thoughts"
  }];
}
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "building-the-casa-capoeira-portal-a-solo-devs-journey-into-code-culture-and-craft",
      children: "Building the Casa Capoeira Portal: A Solo Dev’s Journey Into Code, Culture, and Craft"
    }), "\n", createVNode(_components.p, {
      children: "When I first sat down to start the Casa Capoeira Portal, I wasn’t thinking about buzzwords like “scalable architecture” or “role-based access control.” I was thinking about Mestre Ligeirinho, our community, and the countless Capoeira events, stories, and moments that deserved a proper home on the web."
    }), "\n", createVNode(_components.p, {
      children: "But building that home — alone — meant wearing every hat imaginable:\nProduct manager. Designer. Architect. Backend engineer. Frontend developer. QA tester. Sysadmin. And yes, even CMS architect."
    }), "\n", createVNode(_components.p, {
      children: "This is the story of how I built a production-ready, multilingual CMS platform for a global Capoeira community, entirely on my own — and what I learned along the way."
    }), "\n", createVNode(_components.h2, {
      id: "why-this-project-needed-to-exist",
      children: "Why This Project Needed to Exist"
    }), "\n", createVNode(_components.p, {
      children: "Capoeira is more than movement — it’s history, philosophy, music, and community. And yet, most Capoeira groups still rely on scattered Facebook posts, outdated websites, and word-of-mouth to share events and news."
    }), "\n", createVNode(_components.p, {
      children: "I wanted to create something better:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "A central, multilingual hub for events, posts, and media."
      }), "\n", createVNode(_components.li, {
        children: "A system that could scale from a local group to an international audience."
      }), "\n", createVNode(_components.li, {
        children: "A platform that respects Capoeira’s traditions but also meets modern UX and technical standards."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "I knew from day one this wouldn’t just be a “website.” It would be a custom CMS, tailored for the rhythms and workflows of Capoeira."
    }), "\n", createVNode(_components.h2, {
      id: "the-technology-stack--and-why-i-chose-it",
      children: "The Technology Stack — and Why I Chose It"
    }), "\n", createVNode(_components.p, {
      children: "The stack had to be modern, maintainable, and future-proof without introducing unnecessary complexity."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Framework"
        }), ": Next.js 15 (App Router) + React 18.3 (Server Components by default).\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Why"
            }), ": Server-first rendering for performance, SEO, and cleaner data fetching."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Database & Storage"
        }), ": Supabase (PostgreSQL + Storage) with Prisma ORM.\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Why"
            }), ": SQL reliability + Prisma’s type safety + Supabase’s storage for media."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Auth"
        }), ": NextAuth.js v5 (JWT-based sessions).\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Why"
            }), ": Flexible, secure, and well-documented for role-based control."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "UI"
        }), ": TailwindCSS + ShadCN UI + Radix Primitives.\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Why"
            }), ": Consistent design system, accessibility built-in, rapid iteration."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Validation"
        }), ": Zod on both frontend and backend.\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Why"
            }), ": Single source of truth for input rules."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Email"
        }), ": Resend API with React Email templates.\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Why"
            }), ": Customizable transactional emails in multiple languages."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Testing"
        }), ": Vitest + Playwright for unit, API, and E2E.\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Why"
            }), ": Confidence in core flows (especially event registration)."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "CMS Platform"
        }), ": Custom-built admin panel at ", createVNode(_components.code, {
          children: "/admin"
        }), " with role-based access.\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.strong, {
              children: "Why"
            }), ": Off-the-shelf CMSs (WordPress, Strapi) couldn’t match the tailored i18n and event/media workflows we needed."]
          }), "\n"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "This wasn’t just “the tech I like” — each choice was deliberate to balance performance, maintainability, and cultural requirements."
    }), "\n", createVNode(_components.h2, {
      id: "the-cms-where-the-magic-happens",
      children: "The CMS: Where the Magic Happens"
    }), "\n", createVNode(_components.p, {
      children: "The public site might be the face of the Portal, but the real heart is the custom CMS I built for the teaching team."
    }), "\n", createVNode(_components.h3, {
      id: "core-cms-features",
      children: "Core CMS Features"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Events Manager"
        }), ": Create, edit, publish/unpublish events; configure registration options; upload cover images; attach albums."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Posts Manager"
        }), ": Rich text editor (TipTap) with embedded media, multilingual content creation, and tags."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Media Manager"
        }), ": Batch uploads, drag-and-drop, cover selection, metadata editing, and event/post association."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Newsletter Manager"
        }), ": Subscriber database, campaign creation, analytics."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "User & Role Management"
        }), ": Invite-only access, ADMIN/MODERATOR roles."]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "what-makes-it-different",
      children: "What Makes It Different"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Progressive Translation UI"
        }), ": English content is required, other languages are optional and can be added gradually — perfect for a small admin team."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Cultural Alignment"
        }), ": The forms, terminology, and data structures are tailored to how Capoeira events actually work (multi-day attendance, T-shirts, meals, etc.)."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Role-based Safety"
        }), ": The wrong person can’t accidentally wipe out all event data."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "I wasn’t just building a “back office” — I was crafting an instrument that mestres and moderators could actually enjoy playing."
    }), "\n", createVNode(_components.h2, {
      id: "the-hardest-challenges-and-how-i-solved-them",
      children: "The Hardest Challenges (and How I Solved Them)"
    }), "\n", createVNode(_components.h3, {
      id: "1-true-multilingual-architecturei18n",
      children: "1. True Multilingual Architecturei18n"
    }), "\n", createVNode(_components.p, {
      children: "The i18n requirements went far beyond a few translated strings.\nEvery piece of content — events, posts, albums — needed:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "A default (English) version."
      }), "\n", createVNode(_components.li, {
        children: "Optional translations in 3 more languages."
      }), "\n", createVNode(_components.li, {
        children: "Automatic fallback to the best available language."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "The trap: Most CMSs store translations inline, which quickly gets messy."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "My solution:"
      }), "\nSeparate translation tables in the database (EventTranslation, PostTranslation, MediaAlbumTranslation) with unique constraints and a clean resolution function. This keeps queries fast and fallback logic consistent."]
    }), "\n", createVNode(_components.h3, {
      id: "2-media-uploads-without-painmedia",
      children: "2. Media Uploads Without Painmedia"
    }), "\n", createVNode(_components.p, {
      children: "Events without photos feel incomplete. But uploading and organizing media can be a nightmare for non-technical users."
    }), "\n", createVNode(_components.p, {
      children: "The trap: Upload workflows that block content creation until every file is perfect."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "My solution:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Immediate cover image upload with preview."
      }), "\n", createVNode(_components.li, {
        children: "Batch media uploads after album creation, with progress bars and error feedback."
      }), "\n", createVNode(_components.li, {
        children: "Supabase Storage with strict RLS policies to keep public and private media separate."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "3-event-registration-logic-that-adaptsevents",
      children: "3. Event Registration Logic That Adaptsevents"
    }), "\n", createVNode(_components.p, {
      children: "Capoeira events can be wildly different — a one-day kids’ workshop, a week-long international festival, or anything in between."
    }), "\n", createVNode(_components.p, {
      children: "The trap: Hardcoding a “one-size-fits-all” registration form."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "My solution:"
      })
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Dynamic form generation based on event config."
      }), "\n", createVNode(_components.li, {
        children: "Conditional Zod validation that changes per event."
      }), "\n", createVNode(_components.li, {
        children: "Built-in constraints like one registration per email per event."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "4-building-alone-means-owning-everything",
      children: "4. Building Alone Means Owning Everything"
    }), "\n", createVNode(_components.p, {
      children: "Every bug, every deployment, every database migration — it’s all on me."
    }), "\n", createVNode(_components.p, {
      children: "This meant:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Writing tests before features for critical flows."
      }), "\n", createVNode(_components.li, {
        children: "Keeping strict commit discipline (small, meaningful commits with clear messages)."
      }), "\n", createVNode(_components.li, {
        children: "Automating backups so I could sleep at night."
      }), "\n", createVNode(_components.li, {
        children: ["Documenting every decision in ", createVNode(_components.code, {
          children: "/docs/"
        }), " so future contributors (or future me) wouldn’t be lost."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "security-and-ops-my-invisible-work",
      children: "Security and Ops: My Invisible Work"
    }), "\n", createVNode(_components.p, {
      children: "Users never see it, but a lot of my time went into:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Middleware that protects admin routes and enforces rolesauth."
      }), "\n", createVNode(_components.li, {
        children: "Rate-limiting public forms to prevent spam."
      }), "\n", createVNode(_components.li, {
        children: "Structured logging with context for every requestoperations."
      }), "\n", createVNode(_components.li, {
        children: "Blue-green deployment so updates happen without downtime."
      }), "\n", createVNode(_components.li, {
        children: "Daily database backups + weekly media backups with encryption."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "reflections-as-a-solo-developer",
      children: "Reflections as a Solo Developer"
    }), "\n", createVNode(_components.p, {
      children: "Building this was both exhilarating and exhausting.\nThere were nights where I stared at Prisma migration errors for hours. Days spent debugging why a Supabase storage policy wasn’t behaving. And the endless balancing act between what’s perfect and what ships."
    }), "\n", createVNode(_components.p, {
      children: "But when I saw the first public user register for an event in Greek, get their confirmation email in Portuguese, and browse an event gallery in German — it hit me:\nThis wasn’t just a website. It was a living, breathing digital roda."
    }), "\n", createVNode(_components.h2, {
      id: "final-thoughts",
      children: "Final Thoughts"
    }), "\n", createVNode(_components.p, {
      children: "The Casa Capoeira Portal is now live, fast, secure, multilingual, and easy to use — for both our community and the small admin team that keeps it running."
    }), "\n", createVNode(_components.p, {
      children: "As a solo developer, this project taught me how to:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Balance cultural authenticity with technical excellence."
      }), "\n", createVNode(_components.li, {
        children: "Build a custom CMS that fits a niche better than any off-the-shelf option."
      }), "\n", createVNode(_components.li, {
        children: "Manage scope, performance, and security without a safety net."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "And most importantly — that building software for a community you love is the most rewarding work there is."
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/casa-capoeira-journey.mdx";
const file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/content/blog/casa-capoeira-journey.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/content/blog/casa-capoeira-journey.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
