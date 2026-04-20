import LogoFull from './components/LogoFull';
import LogoNav from './components/LogoNav';
import LogoIcon from './components/LogoIcon';
import LogoHorizontal from './components/LogoHorizontal';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar Example */}
      <nav className="bg-white shadow-sm px-8 py-4 mb-12">
        <LogoNav />
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12 space-y-16">
        {/* Full Logo - Landing Page Hero */}
        <section className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl p-16 text-center">
          <LogoFull />
        </section>

        {/* Logo Variations Grid */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Logo Variations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Horizontal with Tagline */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Horizontal (with tagline)</h3>
              <LogoHorizontal showTagline />
            </div>

            {/* Horizontal without Tagline */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Horizontal (compact)</h3>
              <LogoHorizontal />
            </div>

            {/* Icon Only - Large */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Icon Only (60px)</h3>
              <LogoIcon size={60} />
            </div>

            {/* Icon Only - Small */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Icon Only (32px)</h3>
              <LogoIcon size={32} />
            </div>

            {/* Dark Background Example */}
            <div className="bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-700 col-span-full">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">On Dark Background</h3>
              <div className="flex items-center justify-around flex-wrap gap-8">
                <LogoNav className="[&_svg_path]:!fill-white [&_svg_path]:!stroke-white [&_svg_ellipse]:!stroke-white [&_div]:!text-white" />
                <LogoHorizontal className="[&_svg_path]:!fill-white [&_svg_path]:!stroke-white [&_svg_ellipse]:!stroke-white [&_div]:!text-white" />
                <LogoIcon size={48} className="[&_path]:!fill-white [&_path]:!stroke-white [&_ellipse]:!stroke-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage Guide</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>LogoFull:</strong> Use for landing page heroes, splash screens, or main brand displays</p>
            <p><strong>LogoNav:</strong> Use for navigation bars and headers (compact icon + text)</p>
            <p><strong>LogoHorizontal:</strong> Use for footers, sidebars, or inline branding</p>
            <p><strong>LogoIcon:</strong> Use for favicons, mobile menu icons, or avatar placeholders</p>
          </div>
        </section>
      </div>
    </div>
  );
}