# Converso - AI Companion Learning Platform

## Overview
Converso is a sophisticated AI-powered voice enabled learning platform that enables users to interact with specialized AI companions across various academic subjects. Each companion is tailored to provide subject-specific guidance, making learning more interactive and personalized.

## Key Features
- 🤖 Customizable AI Companions
- 📚 Subject-specific Learning
- 🔐 Secure Authentication
- 🔖 Bookmark System
- 💬 Interactive Conversations
- 📱 Responsive Design
- 🎯 Topic-based Filtering

## Tech Stack
### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- React Hook Form
- Zod Validation

### Backend
- Supabase (Database)
- Clerk (Authentication)
- Server Actions (Next.js)

### Infrastructure
- Vercel (Deployment)
- Sentry (Error Tracking)

## Prerequisites
- Node.js 18+ 
- npm/yarn
- Git

## Environment Variables
Create a `.env.local` file in the root directory with:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk -Security
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vapi
NEXT_PUBLIC_VAPI_WEB_KEY=

# Sentry
SENTRY_AUTH_TOKEN=
```

## Installation & Setup
1. Clone the repository
```bash
git clone https://github.com/MohammedFaraan/converso.git
cd converso
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
converso/
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── companions/        # Companion-related pages
│   ├── my-journey/        # User progress pages
│   └── subscription/      # Subscription management
├── components/            # Reusable React components
│   ├── ui/               # UI component library
│   └── ...               # Feature-specific components
├── lib/                   # Utility functions and configs
│   ├── actions/          # Server actions
│   └── ...               # Other utilities
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Core Features Explained

### Authentication
- Implemented using Clerk
- Protected routes with middleware
- User session management
- OAuth integrations

### Companions System
- Create custom AI companions
- Subject-based categorization
- Interactive conversations
- Bookmarking system
- Session history tracking

### Database Schema
```sql
companions (
  id UUID PRIMARY KEY,
  name TEXT,
  subject TEXT,
  topic TEXT,
  bookmarked BOOLEAN,
  bookmarked_by TEXT
)

session_history (
  id UUID PRIMARY KEY,
  user_id TEXT,
  companion_id UUID,
  created_at TIMESTAMP
)
```

<!-- ## API Routes

### Companions
- `GET /api/companions` - List all companions
- `POST /api/companions` - Create new companion
- `GET /api/companions/:id` - Get specific companion
- `PUT /api/companions/:id` - Update companion -->

<!-- ### Sessions
- `GET /api/sessions` - Get user sessions
- `POST /api/sessions` - Create new session -->

<!-- ## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Performance Optimizations
- Server-side rendering for better SEO
- Image optimization with Next.js
- Lazy loading of components
- Efficient data caching
- Debounced search functionality

## Error Handling
- Sentry integration for error tracking
- Custom error boundaries
- Graceful fallbacks
- User-friendly error messages

## Security Measures
- Authentication middleware
- Protected API routes
- Input validation
- Rate limiting
- Secure environment variables

## License
MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support
For support, email support@converso.com or join our Slack channel.

## Acknowledgments
- Next.js team
- Vercel
- Supabase
- Clerk
- shadcn/ui -->
