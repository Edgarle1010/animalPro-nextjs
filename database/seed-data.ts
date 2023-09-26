import bcrypt from "bcryptjs";

interface SeedProduct {
  sku: string;
  brand: string;
  description: string;
  images: string[];
  price: number;
  sizes: { size: ValidSizes; quantity: number }[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  species: validSpecies[];
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}

type validSpecies = "dog" | "cat" | "other";
type ValidSizes = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type ValidTypes =
  | "leashes-collars"
  | "transporters-travel"
  | "bowls-feeders"
  | "grooming"
  | "home"
  | "beds-blankets"
  | "antifleas-ticks"
  | "training"
  | "dental-care"
  | "cleaning-grooming"
  | "toys"
  | "clothes-accessories";

interface SeedData {
  users: SeedUser[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      name: "Edgar López",
      email: "edgar@google.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
    },
    {
      name: "Eduardo Rios",
      email: "eduardo@google.com",
      password: bcrypt.hashSync("123456"),
      role: "client",
    },
  ],
  products: [
    {
      sku: "139231",
      brand: "Reddy",
      description:
        "¡Llegó la nueva temporada de Reddy! Los mejores accesorios para tu perro, hechos con materiales sustentables, celebra el vínculo entre tú y tu mejor compañero. Combinando a la perfección la función y la estética, Reddy ofrece soluciones inteligentes para cada perro listo para la expedición. Ya sea que a tu amigo peludo le guste ensuciarse las patas o prefiera un estilo de vida más mimado, Reddy ofrece productos para todo tipo de aventureros. Asegúrese de que su próxima gran aventura sea un éxito con los productos Reddy exclusivos de Petco.",
      images: ["139231.jpg", "139231-1.jpg"],
      price: 249,
      sizes: [
        { size: "XS", quantity: 2 },
        { size: "L", quantity: 5 },
      ],
      slug: "reddy_4_winter_bandana_azul_tipo_tejida_para_perro",
      type: "clothes-accessories",
      tags: ["bandana"],
      title: "Reddy 4 Winter Bandana Azul Tipo Tejida para Perro",
      species: ["dog"],
    },
    {
      sku: "138800",
      brand: "Reddy",
      description:
        "Este puffer reflectante Ombre de Reddy tiene que ver con la moda y la funcionalidad. Los detalles reflectivos que brindan visibilidad en condiciones de poca luz, mantendrá a su cachorro seco desde el amanecer hasta el anochecer. Chamarra puffer de corte cuadrado en tela tejida. Gorro forrada y zíper al frente. Borde acanalado alrededor de los hombros. Forrada.",
      images: ["138800.jpg", "138800-1.jpg"],
      price: 899,
      sizes: [
        { size: "XS", quantity: 2 },
        { size: "L", quantity: 5 },
      ],
      slug: "reddy_chamarra_puffer_modelo_ombre_negro_grande",
      type: "clothes-accessories",
      tags: ["jacket"],
      title: "Reddy Chamarra Puffer Modelo Ombre Color Negro",
      species: ["dog"],
    },
    {
      sku: "141083",
      brand: "Youly",
      description:
        "Vestido con sección superior en punto suave, mangas cortas y bordado en la parte superior. Cintura con costura, y falda en tejido estampado con ligero vuelo.",
      images: ["141083.jpg", "141083-1.jpg"],
      price: 184.5,
      sizes: [
        { size: "XS", quantity: 2 },
        { size: "L", quantity: 5 },
      ],
      slug: "youly_spring_vestido_con_bordado_floral_color_rosa",
      type: "clothes-accessories",
      tags: ["dress"],
      title: "Youly Spring Vestido con Bordado Floral Color Rosa",
      species: ["dog"],
    },
    {
      sku: "131079",
      brand: "Bravecto",
      description:
        "Bravecto Spot On es una solución tópica de fácil aplicación para el tratamiento de infestaciones por pulgas, garrapatas, ácaros de sarna demodécica y sarcóptica y por el ácaro (otodectes spp.), así como previene la transmisión de Babesia canis en perros. Otorga una protección de 12 semanas continuas, alto nivel de seguridad y con absorción transdermal. Una sola aplicación de Bravecto Spot On puede eliminar las pulgas presentes en tu hogar.",
      images: ["131079.jpg", "131079-1.jpg"],
      price: 989.0,
      sizes: [{ size: "L", quantity: 2 }],
      slug: "bravecto_spot_on_pipeta_antiparasitaria_para_perro_grande",
      type: "antifleas-ticks",
      tags: ["fleas"],
      title:
        "Bravecto Spot-On Pipeta Antiparasitaria para Perro Grande, 20 a 40 kg",
      species: ["dog"],
    },
    {
      sku: "110716",
      brand: "You & Me",
      description:
        "El árbol para gato de 5 niveles You & Me incluye todo lo que tus gatitos necesitan para jugar, descansar y acicalarse. Sus niveles cubiertos de tela polar tipo borrega cuentan con un juguete colgante móvil, una abertura de escondite con arco tipo cepillo y postes rascadores de sisal que animaran a tu mejor amigo a rascar aquí y no en tus muebles.",
      images: ["110716.jpg", "110716-1.jpg"],
      price: 2999.0,
      sizes: [{ size: "L", quantity: 2 }],
      slug: "mueble_para_gato_tipo_arbol_de_5_niveles_con_juguete_y_arco",
      type: "home",
      tags: ["fleas"],
      title:
        "You & Me Mueble para Gato Tipo Árbol de 5 Niveles con Juguete y Arco",
      species: ["cat"],
    },
  ],
};
