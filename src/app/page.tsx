"use client";

import Image from "next/image";
import {
  Mail,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Code2,
  Terminal,
  Layers,
  Globe,
  CheckCircle2,
  Share2,
  MessageCircle,
  Briefcase,
  MapPin,
  Heart,
} from "lucide-react";

// GitHub SVG Icon (TDS styled)
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

// LinkedIn SVG Icon (TDS styled)
function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function TossProfilePage() {
  const stats = [
    { label: "완료한 프로젝트", value: "24개", change: "+4개" },
    { label: "개발 경력", value: "4년차", change: "Full-Stack" },
    { label: "사용자 만족도", value: "99.8%", change: "최상위" },
    { label: "총 GitHub 커밋", value: "1,850회", change: "올해" },
  ];

  const skills = [
    {
      name: "React & Next.js",
      description: "고성능 SSR 및 반응형 웹 애플리케이션 구축",
      level: "95%",
      icon: Code2,
      badge: "핵심 기술",
    },
    {
      name: "TypeScript",
      description: "타입 안정성과 정교한 로직 아키텍처 설계",
      level: "90%",
      icon: Terminal,
      badge: "주력 언어",
    },
    {
      name: "Tailwind CSS & UI Systems",
      description: "일관되고 매끄러운 디자인 시스템 및 반응형 UI",
      level: "95%",
      icon: Layers,
      badge: "디자인 시스템",
    },
    {
      name: "Node.js & Express API",
      description: "확장 가능한 백엔드 REST API 및 데이터베이스 연동",
      level: "85%",
      icon: Globe,
      badge: "백엔드",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "AI 에이전트 대시보드",
      subtitle: "실시간 AI 데이터 분석 및 워크플로우 자동화",
      description:
        "OpenAI API와 Next.js 16을 활용하여 실시간 업무 효율을 극대화하는 인터랙티브 대시보드예요.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "OpenAI"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "NexShop 이커머스 플랫폼",
      subtitle: "빠르고 유연한 결제 및 큐레이션 커머스",
      description:
        "Stripe 결제 시스템과 Zustand 상태 관리를 결합한 초고속 SSR 쇼핑몰 애플리케이션이에요.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Zustand", "Stripe API", "Next.js"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "DesignFlow 디자인 협업 툴",
      subtitle: "실시간 캔버스 공유 및 프로토타이핑",
      description:
        "WebSockets 기반으로 디자이너와 개발자가 실시간으로 피드백을 주고받는 SaaS 협업 서비스예요.",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      tags: ["TypeScript", "Canvas API", "WebSockets"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "PlanCraft 스마트 목표 플래너",
      subtitle: "개인별 습관 달성률 추적 앱",
      description:
        "스마트 알림과 데이터 시각화로 개인 목표 달성률을 높여주는 유용한 생산성 앱이에요.",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "PostgreSQL", "Prisma"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  const timeline = [
    {
      period: "2024년 ~ 현재",
      role: "Lead Frontend Engineer",
      company: "TechNova Inc.",
      description:
        "핵심 웹 서비스 프론트엔드 아키텍처 설계를 총괄하며, 웹 성능(LCP, CLS) 40% 개선을 주도했어요.",
    },
    {
      period: "2022년 ~ 2024년",
      role: "Full-Stack Developer",
      company: "Startup Lab",
      description:
        "React/Next.js 기반의 SaaS 플랫폼을 구축하고 사용자 맞춤형 대시보드 모듈을 시각화했어요.",
    },
    {
      period: "2021년 ~ 2022년",
      role: "Web Frontend Developer",
      company: "Creative Interactive",
      description:
        "15개 이상의 반응형 서비스 사이트를 구축하고 컴포넌트 라이브러리를 표준화했어요.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#191F28] font-sans antialiased pb-28">
      {/* 1. TDS Top App Bar (56pt) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E8EB]">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-[#191F28]">
              토스 프로필
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F3FF] text-[#3182F6] font-semibold">
              미니앱
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "박현아 프로필",
                    url: window.location.href,
                  });
                }
              }}
              className="p-2 rounded-full hover:bg-[#F2F4F6] text-[#4E5968] transition-colors"
              aria-label="공유하기"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 메인 캔버스 */}
      <main className="max-w-2xl mx-auto px-4 sm:px-5 pt-6 space-y-4">
        {/* 2. TDS Profile Header Card (Hero) */}
        <section className="bg-white rounded-[24px] p-6 border border-[#E5E8EB] shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            {/* 아바타 & 기본 정보 */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#F2F4F6] border border-[#E5E8EB] shrink-0">
                <Image
                  src="/avatar.jpg"
                  alt="박현아 미모지 프로필"
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-[#191F28] tracking-tight">
                    박현아
                  </h1>
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-[#E8F3FF] text-[#3182F6] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3182F6] animate-pulse" />
                    프로젝트 가능
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#4E5968]">
                  Full-Stack & Frontend Developer
                </p>
                <div className="flex items-center gap-3 text-xs text-[#6B7684] pt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B95A1]" /> 서울, 대한민국
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#8B95A1]" /> 4년 차
                  </span>
                </div>
              </div>
            </div>

            {/* 메일 문의 Primary Button */}
            <a
              href="mailto:hyeonah.park@example.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-sm shadow-sm transition-all active:scale-95 text-center"
            >
              <Mail className="w-4 h-4" />
              이메일로 문의하기
            </a>
          </div>

          {/* 소개글 (Toss 해요체 적용) */}
          <div className="mt-5 pt-5 border-t border-[#E5E8EB]">
            <p className="text-[#333D4B] text-sm sm:text-base leading-relaxed break-keep">
              안녕하세요! 사용자의 일상을 더 편리하고 유용하게 만드는 웹 개발자 박현아예요. React, Next.js, TypeScript 기반의 간결하고 확장성 있는 인터페이스 구축에 몰입하고 있어요. 🚀
            </p>

            {/* 소셜 채널 칩 */}
            <div className="flex items-center gap-2 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#333D4B] text-xs font-semibold transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#333D4B] text-xs font-semibold transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://velog.io"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#333D4B] text-xs font-semibold transition-colors"
              >
                <Globe className="w-4 h-4" />
                기술 블로그
              </a>
            </div>
          </div>
        </section>

        {/* 3. TDS Stats Summary Grid (Tabular Nums) */}
        <section className="bg-white rounded-[24px] p-6 border border-[#E5E8EB] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#191F28]">
              핵심 성과 지표
            </h2>
            <span className="text-xs text-[#6B7684] font-medium">
              한눈에 확인해요
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#F2F4F6] p-4 rounded-2xl flex flex-col justify-between"
              >
                <span className="text-xs font-semibold text-[#6B7684]">
                  {stat.label}
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#191F28] tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-bold text-[#3182F6] bg-[#E8F3FF] px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. TDS Tech Stack Section (ListRow Style) */}
        <section className="bg-white rounded-[24px] p-6 border border-[#E5E8EB] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#191F28]">
              보유 기술 스택
            </h2>
            <span className="text-xs font-semibold text-[#3182F6]">
              전문 분야
            </span>
          </div>

          <div className="divide-y divide-[#E5E8EB]">
            {skills.map((skill, idx) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={idx}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F3FF] text-[#3182F6] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#191F28] text-sm sm:text-base">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-semibold text-[#3182F6] bg-[#E8F3FF] px-2 py-0.5 rounded-full">
                          {skill.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7684] mt-0.5">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#191F28] tabular-nums shrink-0">
                    {skill.level}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. TDS Project Showcase (List Card Units) */}
        <section id="projects" className="space-y-3 scroll-mt-20">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-[#191F28]">
              대표 프로젝트
            </h2>
            <span className="text-xs text-[#6B7684] font-medium">
              4개의 주력 작업물
            </span>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-[24px] p-5 border border-[#E5E8EB] shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* 썸네일 & 타이틀 */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative h-44 sm:h-36 sm:w-48 rounded-2xl overflow-hidden bg-[#F2F4F6] shrink-0 border border-[#E5E8EB]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 192px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#191F28]">
                        {project.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#3182F6] mt-0.5">
                        {project.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[#4E5968] mt-2 leading-relaxed break-keep">
                        {project.description}
                      </p>
                    </div>

                    {/* 태그 모음 */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-[#F2F4F6] text-[#4E5968] text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 하단 링크 영역 */}
                <div className="pt-3 border-t border-[#E5E8EB] flex items-center justify-between text-xs font-semibold">
                  <a
                    href={project.demoUrl}
                    className="inline-flex items-center gap-1 text-[#3182F6] hover:underline"
                  >
                    라이브 데모 보기 <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-1 text-[#6B7684] hover:text-[#191F28]"
                  >
                    GitHub 소스 <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. TDS Work Experience Timeline */}
        <section className="bg-white rounded-[24px] p-6 border border-[#E5E8EB] shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#191F28]">
            경력 이력
          </h2>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E8EB]">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative space-y-1">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-[#3182F6] ring-4 ring-white" />
                <span className="text-xs font-bold text-[#3182F6] bg-[#E8F3FF] px-2.5 py-0.5 rounded-full inline-block">
                  {item.period}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#191F28] pt-1">
                  {item.role} <span className="text-[#6B7684] font-normal">| {item.company}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#4E5968] leading-relaxed break-keep">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 7. TDS Protective Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white via-white/95 to-transparent pt-6 pb-6">
        <div className="max-w-2xl mx-auto px-4 sm:px-5 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-[#6B7684]">
              궁금한 내용이 있으신가요?
            </p>
            <p className="text-sm font-bold text-[#191F28]">
              언제든 편하게 메일을 남겨주세요.
            </p>
          </div>
          <a
            href="mailto:hyeonah.park@example.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold text-sm shadow-md transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            이메일로 대화 나눠요
          </a>
        </div>
      </div>
    </div>
  );
}
