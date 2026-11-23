O ToAqui e uma demonstracao de um aplicativo para acompanhar o transporte
escolar. Ele mostra quatro tipos de conta:

  ALUNO         Consulta a viagem, o assento e os avisos.
  RESPONSAVEL   Acompanha a viagem e verifica o status do aluno.
  MONITOR       Consulta as paradas e registra embarques e saidas.
  ADMIN         Organiza os cadastros, as viagens e os indicadores da operacao.

Pense nesta versao como uma maquete de uma casa. A maquete ajuda a ver onde
ficariam os quartos e como se anda pela casa, mas ainda nao e a casa de verdade.
Do mesmo modo, o site mostra as telas e algumas interacoes, mas ainda nao esta
ligado a uma central real de transportes.

Por isso, nomes, horarios, enderecos, avisos e localizacao que aparecem na tela
sao exemplos inventados. O desenho do trajeto nao e um mapa GPS, nao mostra
onde uma van esta de verdade e nao deve ser usado para organizar uma viagem
real. Os registros do painel do Monitor valem somente enquanto a pagina esta
aberta. Os cadastros da Central operacional ficam salvos no navegador usado.


1: COMO ABRIR O TOAQUI
======================

O programa que abre o site no computador e chamado de servidor de
desenvolvimento. Imagine-o como uma pequena loja temporaria: enquanto ela esta
aberta, podemos entrar pelo navegador e ver o site. Ao fechar o servidor, a
loja fecha, mas os arquivos do projeto continuam guardados.

Se estiver usando o VS Code com o projeto aberto:

1. Abra o menu "Terminal" e escolha "Novo Terminal".
2. Na linha de comando, escreva:

     cd ToAqui

   Depois pressione Enter. Esse passo leva o terminal para a pasta do
   aplicativo.
3. Escreva o comando abaixo e pressione Enter:

     npm start -- --host 0.0.0.0

4. Espere ate aparecer um endereco parecido com este:

     http://localhost:4200/

5. Abra esse endereco no navegador. O site deve aparecer.
6. Para fechar o servidor, volte ao terminal e pressione Ctrl+C.

Se o projeto ja estiver configurado no VS Code, tambem pode abrir a lista de
tarefas e escolher "ToAqui: iniciar servidor de desenvolvimento". Essa opcao
faz os mesmos passos de abertura por voce.

Se aparecer uma mensagem dizendo que a porta ja esta em uso, provavelmente ha
outro servidor aberto. Em vez de iniciar outro, confira se o endereco
http://localhost:4200/ ja funciona.


2: COMO ENTRAR NAS CONTAS DE EXEMPLO
====================================

Use estas combinacoes para conhecer o prototipo:

  Escolha "Responsavel":
    Usuario: rcs1
    Senha:   1234

  Escolha "Monitor":
    Usuario: rcs2
    Senha:   1234

  Escolha "Aluno":
    Usuario: rcs3
    Senha:   1234

  Escolha "Admin":
    Usuario: rcs4
    Senha:   1234
