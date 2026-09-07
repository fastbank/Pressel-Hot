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
    name: 'Site Principal',
    description: 'Aproveite seu benefício de 50% OFF.',
    logo: '',
    url: 'https://example.com',
    badge: 'RECOMENDADO',
  } satisfies Site,
  sites: [
    {
      name: 'Site 2',
      description: 'Conheça esta opção.',
      logo: '',
      url: 'https://example.org',
    },
    {
      name: 'Site 3',
      description: 'Explore mais uma opção.',
      logo: '',
      url: 'https://example.net',
    },
  ] satisfies Site[],
};
