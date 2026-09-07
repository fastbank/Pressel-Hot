export type Site = {
  name: string;
  description?: string;
  logo: string;
  url: string;
  badge?: string;
};
// Edite marcas, textos, imagens e links somente neste arquivo.
// Substitua as URLs de exemplo antes de enviar tráfego real.
// Logos: caminho em /public (ex.: /images/logo.png) ou URL https.
// Logo vazio exibe o ícone/inicial padrão.
export const config = {
  discount: 50 as const, // O benefício e o checkout devem permanecer em 50%.
  branding: { name: 'Seu benefício', logo: '' },
  profile: {
    image: '/image.webp',
    name: '@mariadudasapeka',
    description: 'Conteúdo exclusivo para você 💕',
  },
  texts: {
    tituloMiniGame: 'Escolha uma caixa e revele seu benefício',
    textoMiniGame: 'Você tem 1 benefício disponível.',
    textoResultado: 'Benefício desbloqueado!',
    complementoResultado: 'Seu benefício foi liberado.',
    resgatar: 'RESGATAR 50% OFF',
    tituloLinks: 'Seu benefício foi desbloqueado',
    textoLinks: 'Escolha uma opção abaixo para continuar.',
  },
  mainSite: {
    name: 'Conteudos Privados da Duda ❤️‍🔥',
    description: 'Aproveite seu benefício de 50% OFF.',
    logo: '/priv.webp',
    url: 'https://t.me/dudinhavipanabot',
    badge: 'RECOMENDADO',
  } satisfies Site,
  sites: [
    {
      name: 'Previas da Duda ❤️‍🔥',
      description: 'Telegram',
      logo: '/telegram.webp',
      url: 'https://t.me/previasdadudinhaspk',
    },
    {
      name: '@eududinhamariaa',
      description: 'Tiktok',
      logo: '/image.webp',
      url: 'https://www.tiktok.com/@eududinhamariaa',
    },
    {
      name: '@mariidudia',
      description: 'Instagram',
      logo: '/image.webp',
      url: 'https://www.instagram.com/mariidudi/',
    },
  ] satisfies Site[],
};
