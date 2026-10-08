'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Camera, ChevronDown, Cpu, Droplets, ExternalLink, Eye, Gauge, Leaf, Menu, Network, PanelTop, Ruler, ScanLine, Sprout, Terminal, X, Zap } from 'lucide-react'

const images = {
  hero: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260731-WA0010-BAupcxU9L9jMfA3zJUdH9L7RulcMci.jpg',
  overview: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260731-WA0009-hdaYhJKX1NvnXd8qYztcKpabu2Wqd1.jpg',
  architecture: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260731-WA0012-RbT4BkIDHgpGk0Q6j2RfAzgy02leFs.jpg',
  cad: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260731-WA0013-vHM4RjDh8cdFd2Cxp3m3fr17iU7YzC.jpg',
  workflow: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260731-WA0008-jEOfj97rlte6nPbMit7N3q0FnQv1Pu.jpg',
}

const nav = ['System', 'Architecture', 'Impact', 'Roadmap']
const navAr = ['النظام', 'البنية التقنية', 'التأثير', 'خارطة الطريق']
const tabsAr = [
  { id: 'mechanical', label: 'ميكانيكا', title: 'البنية الميكانيكية', text: 'هيكل جانتري صلب مدعوم بأربع دعامات معززة يتيح حركة كارتيسية مستقلة عبر مساحة الزراعة. توفر القضبان الخطية وأحزمة التوقيت المعززة حركة سلسة ودقة في تحديد المواقع، بينما يتحكم المحور Z في عمق الزراعة.', specs: ['حركة كارتيسية X وY وZ', 'مساحة تشغيل 7 × 7 أمتار', 'قضبان توجيه خطية وأحزمة توقيت', 'مشغل لولبي دقيق للمحور Z'] },
  { id: 'embedded', label: 'التحكم المدمج', title: 'تحكم مدمج هرمي', text: 'تعمل Raspberry Pi كوحدة معالجة مركزية لالتقاط الصور وخوارزميات الذكاء الاصطناعي وتخطيط المسار والجدولة. تنفذ Arduino Mega أوامر المحركات وتعالج G-code وتنسق المشغلات بدقة زمنية عالية.', specs: ['وحدة تحكم Raspberry Pi', 'وحدة حركة Arduino Mega', 'اتصال G-code وSerial', 'تنسيق محركات الخطوة عبر GRBL'] },
  { id: 'vision', label: 'الرؤية الحاسوبية', title: 'طبقة إدراك الحقل', text: 'تلتقط كاميرا RGB عالية الدقة مساحة الزراعة أثناء تحرك الجانتري بنمط مسح شبكي. تنشئ OpenCV خريطة رقمية للحقل وتحلل سطح التربة والمناطق الفارغة والنباتات والعوائق والإحداثيات.', specs: ['التقاط الصور بكاميرا RGB', 'معالجة الصور عبر OpenCV', 'نمط مسح شبكي', 'تحليل التضاريس والعوائق والمناطق'] },
  { id: 'ai', label: 'الذكاء الاصطناعي والتخطيط', title: 'قرارات ذكية', text: 'يحول الذكاء الاصطناعي البيانات البيئية إلى قرارات زراعة. تقيّم الخوارزميات تباعد النباتات ومحاذاة الصفوف وتحسين التغطية وتجنب الاصطدام وكفاءة الحركة، ثم تحول الإحداثيات إلى أوامر حركة.', specs: ['تباعد النباتات ومحاذاة الصفوف', 'تحسين التغطية', 'تجنب الاصطدام', 'تحسين دورة التعلم الآلي مستقبلاً'] },
  { id: 'planting', label: 'الزراعة الدقيقة', title: 'وضع البذور المتحكم به', text: 'عند كل إحداثي مستهدف ينخفض المحور Z، وتقوم أداة الحفر بإنشاء حفرة دقيقة، ثم يطلق الموزع بذرة واحدة قبل أن تتراجع الأداة. يضمن ذلك عمقاً وتباعداً ثابتين مع أقل اضطراب للتربة.', specs: ['أداة حفر آلية', 'توزيع بذرة واحدة', 'عمق قابل للضبط من 1 إلى 5 سم', 'تراجع آلي للأداة'] },
  { id: 'irrigation', label: 'الري الذكي', title: 'إدارة مياه موضعية', text: 'تقيس حساسات الرطوبة السعوية ظروف التربة باستمرار. عند انخفاض الرطوبة عن الحدود المحددة، تضخ مضخة المياه وتفتح الصمامات الكهرومغناطيسية لتوصيل المياه إلى المكان المطلوب فقط.', specs: ['حساسات سعوية لحظية', 'مضخة مياه غشائية', 'صمامات كهرومغناطيسية', 'جدولة تعتمد على الحدود'] },
]
const tabs = [
  { id: 'mechanical', label: 'Mechanical', icon: Ruler, title: 'Mechanical infrastructure', text: 'A rigid gantry frame supported by four reinforced corner pillars enables independent Cartesian movement across the cultivation area. Heavy-duty linear guide rails and steel-reinforced timing belts provide smooth movement and positional accuracy. The Z-axis uses a precision lead-screw actuator for planting depth control.', specs: ['Cartesian X, Y, Z kinematics', '7 × 7 meter operational workspace', 'Linear guide rails + reinforced timing belts', 'Precision lead-screw Z actuator'] },
  { id: 'embedded', label: 'Embedded control', icon: Cpu, title: 'Hierarchical embedded control', text: 'A Raspberry Pi functions as the central processing unit for image acquisition, AI algorithms, path planning, scheduling, and software communication. An Arduino Mega executes motor commands, processes G-code, generates stepper pulses, and coordinates actuators with high timing accuracy.', specs: ['Raspberry Pi high-level controller', 'Arduino Mega real-time motion controller', 'G-code + serial communication', 'GRBL stepper motor coordination'] },
  { id: 'vision', label: 'Computer vision', icon: Camera, title: 'Field perception layer', text: 'A high-resolution RGB camera captures the cultivation area as the gantry traverses the field in a systematic raster pattern. OpenCV constructs a digital field map and analyzes soil surfaces, empty cultivation areas, existing plants, surface obstacles, and coordinate references.', specs: ['RGB camera image acquisition', 'OpenCV image processing', 'Raster scanning pattern', 'Terrain, obstacle and zone analysis'] },
  { id: 'ai', label: 'AI & planning', icon: BrainCircuit, title: 'Intelligent decisions', text: 'AI transforms raw environmental data into planting decisions. Algorithms evaluate plant spacing, row alignment, coverage optimization, collision avoidance, and motion efficiency, then convert generated coordinates into motion commands.', specs: ['Plant spacing + row alignment', 'Coverage optimization', 'Collision avoidance', 'Future ML cycle optimization'] },
  { id: 'planting', label: 'Precision planting', icon: Sprout, title: 'Controlled seed placement', text: 'At every target coordinate, the Z-axis lowers the tool, a motorized dibber creates a precise hole, the dispenser releases a single seed, and the tool retracts. This guarantees consistent depth and spacing with minimal soil disturbance.', specs: ['Motorized dibber', 'Single-seed dispensing', 'Configurable 1–5 cm depth', 'Automated tool retraction'] },
  { id: 'irrigation', label: 'Smart irrigation', icon: Droplets, title: 'Localized water management', text: 'Distributed capacitive moisture sensors continuously measure soil conditions. When moisture drops below predefined thresholds, a diaphragm water pump and electronically controlled solenoid valves deliver water only where it is required.', specs: ['Capacitive real-time sensors', 'Diaphragm water pump', 'Electronic solenoid valves', 'Threshold-driven scheduling'] },
]

const impactsAr = [
  ['المجتمع', 'يحسن الروبوت كفاءة الزراعة والري ويقلل الجهد اليدوي، كما يعالج نقص العمالة ويوفر المياه ويدعم المؤسسات التعليمية في أبحاث الذكاء الاصطناعي والروبوتات والزراعة الذكية.'],
  ['الاقتصاد', 'تقلل الأتمتة تكاليف العمالة واستهلاك المياه وهدر البذور وأخطاء الزراعة، وتزيد اتساق المحاصيل والإنتاجية والربحية طويلة المدى.'],
  ['البيئة', 'يقلل الري الموضعي هدر المياه والاستهلاك الزائد للبذور والطاقة، ويدعم ممارسات زراعية مستدامة.'],
  ['التعليم والبحث', 'تجمع المنصة بين الذكاء الاصطناعي والروبوتات والأنظمة المدمجة والرؤية الحاسوبية وإنترنت الأشياء والتصميم الميكانيكي والأتمتة، مع قابلية التوسع في الأبحاث المستقبلية.'],
  ['السوق', 'حل قابل للتوسع للصوبات الذكية والمعامل التعليمية ومراكز الأبحاث والمزارع الصغيرة والمتوسطة ومنشآت الزراعة الداخلية التجارية.'],
]
const impacts = [
  ['Community', 'The robot improves planting and irrigation efficiency while reducing manual effort and operational complexity. It addresses labor shortages, conserves freshwater through precision irrigation, and provides educational institutions with an advanced platform for AI, embedded systems, robotics, automation, and smart agriculture research.'],
  ['Economic', 'Automation reduces labor expenses, water consumption and irrigation costs, seed waste, manual planting errors, and increases crop consistency, productivity, and long-term farming profitability.'],
  ['Environmental', 'Localized watering minimizes unnecessary irrigation and water wastage, prevents excessive seed consumption, lowers energy usage by optimizing robot movement, and supports sustainable agricultural practices.'],
  ['Educational & research', 'The platform integrates Artificial Intelligence, Robotics, Embedded Systems, Computer Vision, IoT, Mechanical Design, and Automation Engineering. Its modular architecture supports future AI, autonomous navigation, wireless communication, and predictive agricultural analytics.'],
  ['Market', 'A scalable, modular solution for smart greenhouses, educational laboratories, agricultural research centers, small and medium-sized farms, and commercial indoor farming facilities. The design can be customized for different crops, environments, and operating requirements.'],
]

const months = ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10']
const timeline = [
  ['Literature Review & Requirement Analysis', [1,2]], ['System Design & CAD Modeling', [1,2]], ['Hardware Procurement', [2,3]], ['Mechanical Structure Assembly', [3,4]], ['Motion System Installation', [3,4]], ['Electronics Integration', [4,5]], ['Embedded Programming', [4,5,6]], ['Computer Vision Development', [5,6,7]], ['AI Algorithm Development', [5,6,7]], ['Irrigation System Integration', [5,6]], ['System Integration', [6,7]], ['Testing & Calibration', [7,8]], ['Performance Evaluation', [8,9]], ['Documentation & Final Report', [9,10]], ['Final Presentation & Demonstration', [10]],
]
const budget = [['Mechanical structure', 'Aluminum profiles, rails, belts and frame components', '—'], ['Motion system', 'Linear motion and transmission components', '—'], ['Stepper motors', 'X/Y/Z actuation motors and drivers', '—'], ['Processing', 'Raspberry Pi, Arduino Mega and control electronics', '—'], ['Vision', 'RGB camera and computer vision components', '—'], ['Irrigation', 'Pump, valves, tubing and moisture sensors', '—'], ['Power', '24 V DC supply and electrical distribution', '—']]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .6 }}>{children}</motion.div> }
function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <div className="mb-12 max-w-3xl"><p className="mb-4 font-mono text-xs uppercase tracking-[.22em] text-emerald-400">{eyebrow}</p><h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">{title}</h2><p className="mt-5 text-base leading-8 text-zinc-400">{copy}</p></div> }

export default function Page() {
  const [activeTab, setActiveTab] = useState('mechanical')
  const [openImpact, setOpenImpact] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const isArabic = language === 'ar'
  const localizedTabs = isArabic ? tabs.map((tab, index) => ({ ...tab, ...tabsAr[index] })) : tabs
  const active = localizedTabs.find((tab) => tab.id === activeTab) ?? localizedTabs[0]
  const localizedNav = isArabic ? navAr : nav
  const localizedImpacts = isArabic ? impactsAr : impacts
  return <main lang={language} dir={isArabic ? 'rtl' : 'ltr'} className="min-h-screen overflow-hidden bg-[#09090b] text-zinc-100 selection:bg-emerald-400 selection:text-black">
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><a href="#top" className="font-mono text-xs font-semibold tracking-[.18em] text-zinc-100">AGPR<span className="text-emerald-400">/01</span></a><div
