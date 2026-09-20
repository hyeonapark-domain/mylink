export default function ProfilePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '1.5rem',
      }}
      className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans"
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '1.25rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
          border: '1px solid #e2e8f0',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
        className="max-w-sm w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center"
      >
        {/* 프로필 아바타 아이콘 */}
        <div
          style={{
            width: '4.5rem',
            height: '4.5rem',
            margin: '0 auto 1.5rem',
            borderRadius: '9999px',
            backgroundColor: '#e0e7ff',
            color: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.15)',
          }}
          className="w-18 h-18 mx-auto mb-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-sm"
        >
          박
        </div>

        {/* 이름 */}
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '0.75rem',
            letterSpacing: '-0.025em',
          }}
          className="text-2xl font-bold text-slate-900 mb-3 tracking-tight"
        >
          박현아
        </h1>

        {/* 소개글 */}
        <p
          style={{
            fontSize: '1rem',
            color: '#64748b',
            lineHeight: 1.6,
            margin: 0,
            wordBreak: 'keep-all',
          }}
          className="text-slate-600 leading-relaxed break-keep"
        >
          안녕하세요! 더 나은 사용자 경험과 깔끔한 코드를 고민하는 개발자입니다.
        </p>
      </div>
    </main>
  );
}
