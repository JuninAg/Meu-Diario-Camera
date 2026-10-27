export type Lugar = {
  id: string;
  nome: string;
  descricao: string;
  fotoUri: string;
  latitude: number;
  longitude: number;
  criadoEm: string;
  atualizadoEm: string;
};

export type LugarInput = Pick<Lugar, 'nome' | 'descricao' | 'fotoUri' | 'latitude' | 'longitude'>;
