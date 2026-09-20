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
  Zap,
  Star,
  CheckSquare,
  Cpu,
  Flame,
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

export default function NeobrutalismProfilePage() {
  const projects = [
    {
      id: 1,
      title: "AI 에이전트 대시보드",
      category: "AI & WORKFLOW",
      description:
        "실시간 AI 데이터 분석과 오토메이션 워크플로우를 제공하는 인터랙티브 대시보드 플랫폼입니다.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
      badgeBg: "bg-amber-300",
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "NexShop 이커머스",
      category: "FULL-STACK SHOP",
      description:
        "초고속 SSR 페이징과 결제 시스템, 유연한 큐레이션을 탑재한 반응형 쇼핑몰 서비스입니다.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Next.js", "Zustand", "Stripe"],
      badgeBg: "bg-pink-400",
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "DesignFlow 협업 툴",
      category: "SAAS PLATFORM",
      description:
        "실시간 캔버스 공유와 프로토타이핑 피드백을 실시간으로 주고받는 웹 기반 디자이너/개발자 협업 툴입니다.",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      tags: ["TypeScript", "Canvas", "WebSockets", "Node.js"],
      badgeBg: "bg-cyan-300",
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "PlanCraft 목표 플래너",
      category: "PRODUCTIVITY",
      description:
        "개인별 목표 달성률 추적 및 습관 형성 알림 기능을 제공하는 터치형 생산성 앱입니다.",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Tailwind", "PostgreSQL", "Prisma"],
      badgeBg: "bg-lime-300",
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  const skills = [
    { name: "React / Next.js", level: "95%", icon: Code2, bg: "bg-amber-300" },
    { name: "TypeScript", level: "90%", icon: Terminal, bg: "bg-cyan-300" },
    { name: "Tailwind CSS", level: "95%", icon: Layers, bg: "bg-pink-400" },
    { name: "Node.js / Express", level: "85%", icon: Globe, bg: "bg-lime-300" },
  ];

  const stats = [
    { label: "PROJECTS DONE", value: "24+", bg: "bg-amber-300", icon: CheckSquare },
    { label: "EXPERIENCE", value: "4 YRS", bg: "bg-cyan-300", icon: Zap },
    { label: "SATISFACTION", value: "99.8%", bg: "bg-pink-400", icon: Star },
    { label: "COMMITS", value: "1,800+", bg: "bg-lime-300", icon: Flame },
  ];

  const timeline = [
    {
      period: "2024 - PRESENT",
      role: "Lead Frontend Engineer",
      company: "TechNova Inc.",
      description: "핵심 웹 서비스 프론트엔드 아키텍처 설계 및 웹 성능(LCP, CLS) 40% 개선 주도.",
      bg: "bg-amber-300",
    },
    {
      period: "2022 - 2024",
      role: "Full-Stack Developer",
      company: "Startup Lab",
      description: "React/Next.js 기반의 SaaS 서비스 구축 및 사용자 맞춤형 대시보드 개발.",
      bg: "bg-cyan-300",
    },
    {
      period: "2021 - 2022",
      role: "Web Frontend Developer",
      company: "Creative Interactive",
      description: "반응형 웹 사이트 15+ 구축 및 UI/UX 디자인 시스템 컴포넌트 라이브러리 제작.",
      bg: "bg-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffdf5] text-black font-sans selection:bg-black selection:text-amber-300 pb-20">
      {/* 1. 상단 마키 롤링 배너 (Neobrutalism Strips) */}
      <div className="bg-amber-300 border-b-4 border-black overflow-hidden py-2.5 whitespace-nowrap font-black uppercase text-xs sm:text-sm tracking-widest select-none">
        <div className="animate-marquee flex gap-8">
          <span>⚡ HYEONAH PARK // FULL-STACK DEVELOPER // CREATIVE UI/UX // NEXT.JS & REACT // OPEN FOR PROJECTS ⚡</span>
          <span>⚡ HYEONAH PARK // FULL-STACK DEVELOPER // CREATIVE UI/UX // NEXT.JS & REACT // OPEN FOR PROJECTS ⚡</span>
          <span>⚡ HYEONAH PARK // FULL-STACK DEVELOPER // CREATIVE UI/UX // NEXT.JS & REACT // OPEN FOR PROJECTS ⚡</span>
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        {/* 2. 메인 히어로 카운터 레트로 윈도우 (Neo Hero Card) */}
        <div className="neo-box-static rounded-2xl overflow-hidden">
          {/* 레트로 윈도우 헤더 바 */}
          <div className="bg-black text-white px-4 py-2.5 font-mono text-xs font-bold flex justify-between items-center border-b-3 border-black">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 border border-black inline-block" />
              <span className="ml-2">C:\HYEONAH_PARK_PROFILE_V2.EXE</span>
            </span>
            <span className="hidden sm:inline-block font-bold bg-amber-300 text-black px-2 py-0.5 rounded text-[10px]">
              ONLINE 🟢
            </span>
          </div>

          {/* 레트로 히어로 카운터 바디 */}
          <div className="p-6 sm:p-10 bg-amber-300">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* 아바타 이미지 & 3D 테두리 */}
              <div className="relative group shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 relative rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden bg-white transition-transform duration-200 group-hover:-rotate-2">
                  <Image
                    src="/avatar.jpg"
                    alt="박현아 애플 미모지 프로필"
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-cover"
                    priority
                  />
                </div>
                {/* 팝 배지 스티커 */}
                <div className="absolute -bottom-3 -right-3 neo-badge bg-lime-300 text-black px-2.5 py-1 text-xs">
                  DEV ⚡
                </div>
              </div>

              {/* 자기소개 & 볼드 텍스트 */}
              <div className="flex-1 text-center md:text-left space-y-4">
                {/* 스티커 태그 그룹 */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="neo-badge bg-lime-300 text-black">
                    🟢 AVAILABLE FOR HIRE
                  </span>
                  <span className="neo-badge bg-cyan-300 text-black">
                    📍 SEOUL, KOREA
                  </span>
                  <span className="neo-badge bg-pink-400 text-black">
                    ⚡ 4+ YRS EXP
                  </span>
                </div>

                {/* 메인 타이틀 */}
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-none">
                    박현아
                  </h1>
                  <div className="mt-2 inline-block bg-black text-amber-300 px-3 py-1 font-mono font-bold text-xs sm:text-sm rounded border border-black shadow-[2px_2px_0px_0px_#000]">
                    FULL-STACK DEVELOPER & UI/UX ENTHUSIAST
                  </div>
                </div>

                {/* 인트로 바이오 */}
                <p className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed break-keep bg-white p-4 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_#000]">
                  👋 안녕하세요! 사용자 경험과 오차 없는 정교한 코드를 설계하는 개발자 박현아입니다. React, Next.js, TypeScript 기반의 팝하고 감각적인 웹 애플리케이션 구축을 즐깁니다.
                </p>

                {/* 액션 버튼 바 */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <a
                    href="mailto:hyeonah.park@example.com"
                    className="neo-btn bg-pink-400 hover:bg-pink-300 text-black px-5 py-2.5 rounded-xl text-sm font-black"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    EMAIL ME
                  </a>
                  <a
                    href="#projects"
                    className="neo-btn bg-lime-300 hover:bg-lime-200 text-black px-5 py-2.5 rounded-xl text-sm font-black"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    PROJECTS
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn bg-white hover:bg-slate-100 text-black p-2.5 rounded-xl"
                    title="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn bg-white hover:bg-slate-100 text-black p-2.5 rounded-xl"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3. 스탯 그리드 (Neobrutalism Color Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className={`neo-box-static ${stat.bg} p-5 rounded-2xl text-center hover:-rotate-2 transition-transform duration-200`}
              >
                <div className="inline-flex p-2 rounded-xl bg-black text-white mb-2 shadow-[2px_2px_0px_0px_#fff]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-black text-black uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. 기술 스택 섹션 (Skills Matrix Window) */}
        <section className="neo-box-static rounded-2xl bg-white overflow-hidden">
          <div className="bg-black text-white px-4 py-2.5 font-mono text-xs font-bold flex justify-between items-center border-b-3 border-black">
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-300" />
              <span>SKILLS_MATRIX.CONFIG</span>
            </span>
            <span className="neo-badge bg-cyan-300 text-black py-0.5 text-[10px]">VER 4.2</span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
              <Code2 className="w-6 h-6 text-black" />
              TECH STACK & CORE CAPABILITIES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, idx) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={idx}
                    className={`neo-box-static ${skill.bg} p-4 rounded-xl flex items-center gap-4`}
                  >
                    <div className="p-3 bg-black text-white rounded-xl shadow-[2px_2px_0px_0px_#fff]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-black text-sm sm:text-base uppercase">
                          {skill.name}
                        </span>
                        <span className="neo-badge bg-black text-white text-[10px]">
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full bg-white border-2 border-black rounded-full h-3 overflow-hidden p-0.5 shadow-[2px_2px_0px_0px_#000]">
                        <div
                          className="bg-black h-full rounded-full transition-all duration-1000"
                          style={{ width: skill.level }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. 대표 프로젝트 갤러리 (Retro Windows Grid) */}
        <section id="projects" className="space-y-6 scroll-mt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-4 border-black pb-3">
            <div>
              <div className="neo-badge bg-pink-400 text-black mb-1">
                PORTFOLIO SHOWCASE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-black" />
                FEATURED_PROJECTS.LOG
              </h2>
            </div>
            <span className="text-xs font-extrabold text-black font-mono">
              [TOTAL 4 ITEMS]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="neo-box rounded-2xl overflow-hidden flex flex-col bg-white"
              >
                {/* 창 제목 바 */}
                <div className="bg-black text-white px-3 py-2 font-mono text-xs font-bold flex justify-between items-center">
                  <span className="truncate max-w-[200px]">{project.title}.exe</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-400 inline-block" />
                  </div>
                </div>

                {/* 썸네일 이미지 */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden border-b-3 border-black bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className={`absolute top-3 left-3 neo-badge ${project.badgeBg} text-black font-extrabold`}>
                    {project.category}
                  </div>
                </div>

                {/* 내용 바디 */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-black uppercase">
                      {project.title}
                    </h3>
                    <p className="text-slate-900 text-xs sm:text-sm font-bold mt-2 leading-relaxed break-keep">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* 태그 목록 */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="neo-badge bg-white text-black text-[10px]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex items-center gap-2 pt-2">
                      <a
                        href={project.demoUrl}
                        className="neo-btn bg-amber-300 text-black px-4 py-1.5 text-xs font-black rounded-lg flex-1"
                      >
                        DEMO <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="neo-btn bg-cyan-300 text-black px-4 py-1.5 text-xs font-black rounded-lg flex-1"
                      >
                        CODE <GithubIcon className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 6. 경력 이력 타임라인 (Neobrutalism Timeline) */}
        <section className="neo-box-static rounded-2xl bg-white p-6 sm:p-8 space-y-6">
          <div className="border-b-3 border-black pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
              <Calendar className="w-6 h-6 text-black" />
              WORK_EXPERIENCE.TIMELINE
            </h2>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-1 before:bg-black">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-10">
                {/* 3D 사각형 노드 */}
                <div className={`absolute left-1 top-1 w-6 h-6 ${item.bg} border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-mono text-xs font-black`} />

                <div className="neo-box p-4 rounded-xl bg-white">
                  <span className={`neo-badge ${item.bg} text-black text-[10px] mb-2`}>
                    {item.period}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-black">
                    {item.role} <span className="font-extrabold text-slate-600">@ {item.company}</span>
                  </h3>
                  <p className="text-slate-900 text-xs sm:text-sm font-bold mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. 하단 네오 브루탈리즘 CTA 카드 */}
        <div className="neo-box-static bg-pink-400 rounded-2xl p-8 sm:p-10 text-black text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="neo-badge bg-yellow-300 text-black">LET'S CONNECT</span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
              함께 멋진 프로젝트를 만들어볼까요? ⚡
            </h2>
            <p className="font-bold text-black text-sm sm:text-base">
              새로운 포지션 제안이나 협업 프로젝트 아이디어가 있으시다면 언제든 연락해 주세요!
            </p>
          </div>
          <a
            href="mailto:hyeonah.park@example.com"
            className="neo-btn bg-amber-300 text-black px-7 py-4 rounded-xl text-base font-black shrink-0"
          >
            <Send className="w-5 h-5 mr-2" />
            SEND MESSAGE
          </a>
        </div>

        {/* 8. 풋터 */}
        <footer className="pt-8 text-center text-xs font-bold text-black flex flex-col items-center gap-2">
          <div className="neo-badge bg-white text-black">
            © 2026 HYEONAH PARK // NEOBRUTALISM EDITION
          </div>
        </footer>
      </main>
    </div>
  );
}
