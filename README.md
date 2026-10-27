# Meu Diário de Lugares

Aplicativo Android para registrar lugares visitados com nome, descrição, fotografia e coordenadas capturadas pelo GPS. Os registros e as fotos ficam no armazenamento local do aparelho; não há servidor nem conta necessária.

## Objetivo e funcionalidades

- Registrar, listar, consultar, editar e excluir lugares.
- Tirar uma foto com a câmera ou escolher uma imagem existente.
- Capturar latitude e longitude após uma ação explícita do usuário.
- Abrir as coordenadas no Google Maps ou em outro app de mapas disponível.
- Manter os registros entre fechamentos e reaberturas do app.
- Validar os campos e informar erros de permissão, localização, imagem e armazenamento.

## Tecnologias

React Native, Expo SDK 58, TypeScript, Expo Router, Expo ImagePicker, Expo Location, Expo FileSystem e AsyncStorage.

## Pré-requisitos

- Node.js LTS e npm.
- VS Code (recomendado).
- Android com Expo Go compatível com SDK 58, ou emulador Android configurado no Android Studio.
- Para GPS mais preciso, aparelho com localização ativada e sinal disponível.

## Instalação e execução

No terminal do VS Code, abra a pasta `MeuAppCameraGPS` e rode:

```bash
npm install
npx expo start
```

Para testar em um celular, instale o Expo Go compatível com o SDK do projeto, conecte computador e celular à mesma rede Wi-Fi, escaneie o QR code exibido no terminal e aceite abrir o projeto. Para emulador, inicie o Android Emulator antes e pressione `a` no terminal do Expo. Também é possível executar `npm run android` com o emulador aberto.

Se sua versão instalada do Expo Go não aceitar o SDK 58, use um development build Android (`npx expo run:android`) em vez de tentar abrir o projeto com uma versão incompatível do Expo Go.

## Permissões de câmera e GPS

As permissões são pedidas quando o usuário toca em **Tirar foto** ou **Capturar localização GPS**. Para selecionar uma foto, o Android pode usar o seletor de fotos do sistema. Se uma permissão for negada, o app informa o motivo; reative-a em **Configurações do Android → Apps → Meu Diário de Lugares → Permissões**. Ative também **Localização** nas configurações rápidas do aparelho. Nenhuma coordenada de exemplo é usada.

## Armazenamento local

AsyncStorage guarda uma lista JSON de metadados: identificador, nome, descrição, URI da fotografia e coordenadas, além das datas de criação e atualização. O conteúdo da fotografia é copiado para o diretório persistente privado do app com Expo FileSystem; no AsyncStorage fica somente o caminho da imagem. Ao excluir um registro, a foto correspondente também é removida. Desinstalar o aplicativo ou limpar seus dados apaga os registros locais.

## Estrutura principal

```text
src/
  app/                 Rotas e telas do Expo Router
    detalhes/[id].tsx  Detalhes do lugar
    index.tsx          Tela inicial
    lugares.tsx        Lista e ações dos registros
    novo-lugar.tsx     Criação e edição
  ui.tsx               Elementos reutilizáveis da interface
  services/
    camera.ts          Câmera e seletor de imagens
    location.ts        Permissão e leitura GPS
    storage.ts         AsyncStorage e arquivos persistentes
  Lugar.ts             Tipo do registro
app.json               Identidade e configuração de permissões
package.json           Dependências e comandos
```

## Comandos

```bash
npm install             # instala dependências
npx expo start          # inicia o servidor de desenvolvimento
npm run android         # inicia e abre no Android conectado/emulado
npx tsc --noEmit        # verifica os tipos TypeScript
npx expo-doctor         # verifica configuração e dependências Expo
```

## Problemas comuns

- **QR code não conecta:** deixe o telefone e o computador na mesma rede; tente `npx expo start --tunnel` se a rede bloquear conexões locais.
- **Expo Go incompatível:** instale a versão do Expo Go compatível com SDK 58 ou crie um development build Android.
- **Câmera negada/indisponível:** confira as permissões do aplicativo e feche outros apps que estejam usando a câmera.
- **GPS sem posição:** ative a localização, teste ao ar livre e aguarde o sinal. O app não salva coordenadas se a leitura falhar.
- **Falha ao gravar:** confira o espaço livre e tente novamente; os arquivos ficam no armazenamento privado do app.
- **Dependências divergentes:** rode `npx expo install --fix` e depois `npm install`.

## Testes manuais no Android

1. Abrir o app e conferir a tela inicial e a contagem de registros.
2. Registrar um lugar sem nome, descrição, foto ou GPS; confirmar que o app explica os campos ausentes.
3. Negar a permissão de câmera e conferir a mensagem; permitir e tirar uma foto; tirar outra para substituir a prévia.
4. Capturar GPS com localização ligada e conferir latitude e longitude reais; repetir com a localização desligada e verificar o aviso.
5. Salvar e conferir o cartão, detalhes, data e coordenadas; abrir as coordenadas no mapa.
6. Editar o nome/descrição e a foto; fechar e abrir o app e confirmar a persistência.
7. Excluir um lugar, cancelar uma exclusão e confirmar outra; conferir a mensagem de lista vazia quando aplicável.

## GitHub

Crie um repositório vazio no GitHub e, no terminal desta pasta, substitua `URL_DO_REPOSITORIO` pelo endereço real exibido pelo GitHub:

```bash
git init
git add .
git commit -m "Projeto inicial: Meu Diário de Lugares"
git branch -M main
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```

O `.gitignore` exclui dependências instaladas, caches, builds e arquivos locais. Não publique tokens, credenciais ou dados pessoais.

## Integrantes

- Nome: ______________________________________________
- Nome: ______________________________________________
- Nome: ______________________________________________
