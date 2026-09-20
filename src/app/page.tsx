import Image from "next/image";
import {
  Mail,
  Globe,
  MapPin,
  Briefcase,
  Sparkles,
  ExternalLink,
  Code2,
  Terminal,
  Layers,
  Calendar,
  Send,
  Heart,
} from "lucide-react";

// GitHub SVG Component
function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// LinkedIn SVG Component
function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function ProfilePage() {
  const projects = [
    {
      id: 1,
      title: "AI 에이전트 관리 대시보드",
      category: "Full-Stack / AI Integration",
      description:
        "실시간 AI 데이터 분석 및 인터랙티브 워크플로우 자동화를 지원하는 반응형 웹 대시보드입니다.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "NexShop 이커머스 플랫폼",
      category: "Web Application",
      description:
        "초고속 SSR 페이징과 결제 시스템, 유연한 큐레이션을 제공하는 반응형 쇼핑몰 서비스입니다.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Next.js", "Zustand", "Stripe API"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "DesignFlow 디자인 협업 툴",
      category: "SaaS Platform",
      description:
        "실시간 캔버스 공유와 프로토타이핑 피드백을 주고받는 웹 기반 디자이너/개발자 협업 플랫폼입니다.",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      tags: ["TypeScript", "Canvas API", "WebSockets", "Node.js"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "PlanCraft 스마트 목표 플래너",
      category: "Productivity",
      description:
        "개인별 목표 달성률 추적 및 습관 형성 알림 기능을 갖춘 인터랙티브 생산성 애플리케이션입니다.",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Tailwind CSS", "PostgreSQL", "Prisma"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  const skills = [
    { name: "React / Next.js", level: "95%", icon: Code2, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40" },
    { name: "TypeScript", level: "90%", icon: Terminal, color: "text-sky-500 bg-sky-50 dark:bg-sky-950/40" },
    { name: "Tailwind CSS", level: "95%", icon: Layers, color: "text-teal-500 bg-teal-50 dark:bg-teal-950/40" },
    { name: "Node.js / Express", level: "85%", icon: Globe, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" },
  ];

  const stats = [
    { label: "프로젝트 완료", value: "24+" },
    { label: "총 개발 경력", value: "4년차" },
    { label: "클라이언트 만족도", value: "99.8%" },
    { label: "GitHub 커밋", value: "1,800+" },
  ];

  const timeline = [
    {
      period: "2024 - 현재",
      role: "Lead Frontend Engineer",
      company: "TechNova Inc.",
      description: "핵심 웹 서비스 프론트엔드 아키텍처 설계 및 웹 성능(LCP, CLS) 40% 개선 주도.",
    },
    {
      period: "2022 - 2024",
      role: "Full-Stack Developer",
      company: "Startup Lab",
      description: "React/Next.js 기반의 SaaS 서비스 구축 및 사용자 맞춤형 대시보드 개발.",
    },
    {
      period: "2021 - 2022",
      role: "Web Frontend Developer",
      company: "Creative Interactive",
      description: "반응형 웹 사이트 15+ 구축 및 UI/UX 디자인 시스템 컴포넌트 라이브러리 제작.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* 1. 커버 배너 히어로 */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
          alt="Profile Cover"
          fill
          priority
          className="object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
        
        {/* 히어로 상단 구석 장식 요소 */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 dark:bg-slate-900/40 text-white backdrop-blur-md border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for projects</span>
          </span>
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10 pb-16">
        {/* 2. 프로필 카드 헤더 */}
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
            
            {/* 아바타 & 기본 정보 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* 프로필 이미지 (아바타) */}
              <div className="relative group">
                <div className="w-32 h-32 sm:w-36 sm:h-36 relative rounded-2xl overflow-hidden ring-4 ring-white dark:ring-slate-900 shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="박현아 프로필"
                    fill
                    sizes="(max-width: 640px) 128px, 144px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-white text-[10px]" title="온라인 상태">
                  ✓
                </div>
              </div>

              {/* 이름 및 타이틀 */}
              <div className="mt-2 sm:mt-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    박현아
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                    Full-Stack Engineer
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  사용자 경험과 깔끔한 코드를 만드는 개발자
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> 서울, 대한민국
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" /> 프리랜서 / 정규직 가능
                  </span>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
              <a
                href="mailto:hyeonah.park@example.com"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail className="w-4 h-4" />
                이메일 문의
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm transition-all duration-200"
              >
                포트폴리오
              </a>
            </div>

          </div>

          {/* 소개 문구 */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base break-keep">
              안녕하세요! 4년 차 웹 개발자 박현아입니다. React, Next.js, TypeScript 기반의 확장성 있는 웹 애플리케이션 구축을 즐깁니다. Intuitive한 UI/UX와 오차 없는 로직 설계를 바탕으로 사용자에게 최상의 가치를 전달하는 데 몰입합니다.
            </p>

            {/* 소셜 매체 아이콘 링크 */}
            <div className="flex items-center gap-3 mt-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://velog.io"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Blog"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. 스탯 카운터 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 4. 주요 기술 스택 */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            기술 스택 & 핵심 역량
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, idx) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800 flex items-center gap-4 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                >
                  <div className={`p-3 rounded-xl ${skill.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                        {skill.name}
                      </span>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: skill.level }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. 주요 프로젝트 갤러리 */}
        <section id="projects" className="mb-12 scroll-mt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                대표 프로젝트
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                직접 기획하고 개발한 주요 프로젝트 갤러리입니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/70 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* 프로젝트 이미지 썸네일 */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    {project.category}
                  </div>
                </div>

                {/* 프로젝트 카드 본문 */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed break-keep">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
                    {/* 기술 태그 목록 */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 데모 & 코드 링크 */}
                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href={project.demoUrl}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        라이브 데모 <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                      >
                        소스 코드 <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 경력 및 이력 타임라인 */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            경력 이력 (Work Experience)
          </h2>

          <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800 shadow-sm">
            <div className="relative border-l-2 border-indigo-100 dark:border-slate-800 ml-3 space-y-8">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative pl-6">
                  {/* 타임라인 원형 아이콘 */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-900" />
                  
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
                    {item.period}
                  </span>
                  
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-2">
                    {item.role} <span className="text-slate-400 font-normal">@ {item.company}</span>
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. 대화 신청 CTA 카드 */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-indigo-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              함께 멋진 프로젝트를 만들어볼까요?
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base mt-2 max-w-xl">
              새로운 포지션 제안이나 협업 프로젝트 아이디어가 있으시다면 언제든 편하게 연락해 주세요.
            </p>
          </div>
          <a
            href="mailto:hyeonah.park@example.com"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-sm shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            메일 보내기
          </a>
        </div>

        {/* 8. 풋터 */}
        <footer className="mt-16 text-center text-xs text-slate-400 dark:text-slate-600 flex flex-col items-center gap-2">
          <p>© 2026 박현아 (Hyeonah Park). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js & Tailwind CSS <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </footer>
      </main>
    </div>
  );
}
