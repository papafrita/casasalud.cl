export interface ProviderProfileData {
    greeting: string;
    paragraphs: string[];
    qualifications: string[];
    philosophy: string[];
    service: {
        name: string;
        price: string;
        duration: string;
    };
    bgImage?: string;
    personImage?: string;
}

export const providerProfiles: Record<string, ProviderProfileData> = {
    'catalina-san-juan': {
        greeting: "¡Hola! Soy Catalina San Juan Mondaca",
        paragraphs: [
            "Médica general egresada de la Universidad de la Frontera y residente en Medicina Familiar Comunitaria en la Universidad Austral de Chile.",
            "Llevo más de 8 años trabajando en atención primaria, medicina rural y urgencias. En todos esos contextos he cultivado una forma de atender que combina solidez clínica, sensibilidad y presencia. Escuchar, para mí, es estar disponible con todo lo que soy, con respeto y sin apuro.",
            "Soy madre de Paz, feminista y sureña 🌱. Mi enfoque integra lo biológico, lo emocional, lo sociocultural y lo espiritual, entendiendo que la salud se vive en muchas capas. Acompaño procesos desde una medicina que puede ser concreta —como una receta o una pauta de manejo—, pero también una pausa, una pregunta, o una posibilidad de volver a habitarse.",
            "No realizo terapias complementarias online, pero sí puedo orientarte hacia caminos terapéuticos alternativos si eso es lo que estás buscando."
        ],
        qualifications: [
            "• Diplomada en Salud Familiar (U. de Chile)",
            "• Diplomada en Geriatría y Gerontología Social (UFRO)",
            "• Certificada en Fitoterapia con mención en personas mayores (PUC)",
            "• Formación en Género y Feminismos (U. de Chile)",
            "• Iniciación en Reiki Nivel I"
        ],
        philosophy: [
            "Además de mi formación académica, llevo más de 15 años practicando yoga, meditación y otras terapias complementarias que han enriquecido mi mirada sobre la salud, integrando saberes naturales, simbólicos y ancestrales.",
            "Me interesa que cada persona pueda encontrar un espacio donde cuidarse de forma autónoma, con dignidad y en sintonía con su historia 💜",
            "Puedes conocer más de mi mirada en @dra.sanjuan",
            "Nos vemos cuando lo necesites.",
            "Aquí hay medicina con raíz y con alma."
        ],
        service: {
            name: "Consulta médica integral online",
            price: "$35.000",
            duration: "30 minutos"
        },
        bgImage: "url('/assets/images/header-bg.png')",
        personImage: "url('/assets/images/catalina-breastfeeding.png')"
    },
    'dr-tomas-valdes': {
        greeting: "¡Hola! Soy Dr. Tomás Valdés",
        paragraphs: [
            "Médico Cirujano con especialización en Medicina General Integrativa, comprometido con abordar la salud desde una perspectiva completa y humana.",
            "A lo largo de mi carrera clínica, me he enfocado en encontrar la causa raíz de las afecciones en lugar de solo tratar sus síntomas. Mi práctica combina los conocimientos de la medicina convencional con enfoques complementarios basados en evidencia científica.",
            "Creo firmemente en el poder que tiene cada paciente para sanar cuando se le brindan las herramientas, la educación y el acompañamiento adecuado."
        ],
        qualifications: [
            "• Médico Cirujano (Universidad de Chile)",
            "• Diplomado en Medicina Integrativa",
            "• Formación Clínica en Medicina Funcional",
            "• Curso Avanzado de Nutrición Ortomolecular",
            "• Especialización en Microbiota Intestinal"
        ],
        philosophy: [
            "Mi enfoque se basa en escuchar tu historia completa. Cada síntoma es una señal del cuerpo, y juntos trabajaremos para entender qué necesitas para recuperar tu bienestar.",
            "Me interesa fomentar hábitos sostenibles que prevengan enfermedades a largo plazo.",
            "Puedes conocer más sobre mis consejos de salud en @dr.tomasvaldes",
            "Aquí encontrarás un espacio seguro, empático y libre de juicios."
        ],
        service: {
            name: "Consulta Medicina General Integrativa",
            price: "$35.000",
            duration: "45 minutos"
        },
        bgImage: "url('/assets/images/header-bg.png')"
    },
    'ps-ana-rojas': {
        greeting: "¡Hola! Soy Ps. Ana Rojas",
        paragraphs: [
            "Psicóloga Clínica enfocada en el bienestar emocional y mental, con especialidad en el manejo de la ansiedad, estrés y desarrollo personal.",
            "Mi propósito es acompañarte en tu proceso de autoconocimiento, brindándote un espacio seguro donde puedas expresar tus emociones y superar los obstáculos que te impiden vivir plenamente.",
            "Trabajo desde un enfoque integrativo, adaptando las herramientas terapéuticas a las necesidades y tiempos de cada persona, reconociendo que cada historia es única."
        ],
        qualifications: [
            "• Psicóloga Clínica (Universidad Católica de Chile)",
            "• Postítulo en Psicoterapia Cognitivo-Conductual",
            "• Diplomado en Manejo de Ansiedad y Estrés",
            "• Especialización en Mindfulness y Regulación Emocional"
        ],
        philosophy: [
            "Creo que pedir ayuda es el primer paso hacia la sanación. La terapia es un viaje colaborativo donde tú eres el experto en tu vida.",
            "Mi objetivo es entregarte herramientas prácticas para que puedas gestionar tus emociones de manera efectiva en el día a día.",
            "Sígueme en @ps.anarojas para reflexiones diarias.",
            "Tu salud mental es una prioridad, no un lujo."
        ],
        service: {
            name: "Sesión Psicológica Online",
            price: "$40.000",
            duration: "60 minutos"
        },
        bgImage: "url('/assets/images/header-bg.png')"
    },
    'nut-camila-silva': {
        greeting: "¡Hola! Soy Nut. Camila Silva",
        paragraphs: [
            "Nutricionista Clínica apasionada por la alimentación consciente y el impacto de los hábitos en la calidad de vida.",
            "Mi enfoque se aleja de las dietas restrictivas. Busco educar y acompañar a mis pacientes para que construyan una relación sana con la comida, entendiendo que nutrirse es un acto de autocuidado.",
            "Te ayudaré a adaptar tu alimentación a tu estilo de vida, tus gustos y tus necesidades biológicas, de manera realista y sostenible."
        ],
        qualifications: [
            "• Nutricionista Dietista (Universidad de Valparaíso)",
            "• Diplomada en Nutrición Clínica y Metabolismo",
            "• Certificación en Alimentación Intuitiva y TCA",
            "• Especialización en Nutrición Basada en Plantas",
            "• Curso de Inmunonutrición"
        ],
        philosophy: [
            "Comer debe ser un placer, no una fuente de culpa. Trabajo para que mis pacientes redescubran el disfrute por la comida mientras cuidan su salud.",
            "No hay alimentos 'buenos' o 'malos', sino patrones alimentarios que debemos equilibrar.",
            "Encuentra recetas y tips de nutrición en @nut.camilasilva",
            "Juntos crearemos un plan que se adapte a ti, no al revés."
        ],
        service: {
            name: "Evaluación Nutricional",
            price: "$30.000",
            duration: "45 minutos"
        },
        bgImage: "url('/assets/images/header-bg.png')"
    }
};
