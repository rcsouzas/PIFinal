# ToAqui — visão e requisitos do produto

## Visão geral

**ToAqui** é uma plataforma para dar mais transparência e segurança ao transporte
escolar, facilitando o acompanhamento do veículo, a confirmação de embarque e a
comunicação de ocorrências.

**Equipe:** Rogério Cater Souza Júnior, Enzo Luiz Keller Granemann, Joaquim
Matheus da Silva Costa, João Vitor Lemos de Campos, Paulo Neto Azevedo e Leandro
Gabriel Tostes.

**Problema:** falta de visibilidade sobre a localização do transporte, a presença
dos passageiros e problemas ocorridos durante a viagem.

**Proposta de valor:** responsáveis acompanham a viagem e recebem informações de
embarque e desembarque; motoristas consultam antecipadamente as paradas e as
presenças; alunos recebem previsões e podem validar o embarque.

**Público-alvo:** operadores de transporte escolar, público ou privado; alunos;
e pais, responsáveis e guardiões.

## Perfis e funcionalidades

### Responsável

- Acompanhar a localização do transporte.
- Verificar a situação do assento associado ao aluno.
- Receber notificações de embarque e desembarque.
- Avisar com antecedência quando o aluno não usará o transporte.
- Comunicar-se com o motorista ou com a central em situações de emergência.

### Motorista

- Vincular no máximo um motorista a cada sessão de viagem.
- Consultar a rota e as paradas dos alunos.
- Ver a lista atualizada de passageiros presentes ou ausentes.
- Enviar um alerta de pânico/incidente à administração e aos responsáveis.

### Aluno

- Consultar a previsão de chegada à sua parada.
- Validar o embarque com QR Code.
- Receber um alerta de proximidade antes da chegada do transporte.

## Requisitos funcionais

| ID    | Requisito                                                                                                            |
| ----- | -------------------------------------------------------------------------------------------------------------------- |
| RF001 | Permitir o vínculo de um motorista por sessão de transporte (viagem) por vez.                                        |
| RF002 | Respeitar a capacidade cadastrada do veículo e impedir reservas ou alocações acima do limite.                        |
| RF003 | Permitir que responsáveis rastreiem remotamente a localização do transporte.                                         |
| RF004 | Permitir que responsáveis verifiquem se o aluno associado à viagem está em seu assento.                              |
| RF005 | Registrar e notificar os momentos de entrada e saída do aluno, atualizando a ocupação do assento.                    |
| RF006 | Apresentar ao motorista uma interface simples com as paradas dos alunos e a rota atual.                              |
| RF007 | Armazenar históricos de viagens, ocorrências, horários de paradas e incidentes para relatórios.                      |
| RF008 | Permitir que aluno ou responsável avise uma falta/ausência e retirar a parada da rota diária do motorista.           |
| RF009 | Permitir validar o embarque por QR Code ou biometria facial e integrar a validação ao registro de ocupação do RF005. |

## Requisitos não funcionais

| ID     | Requisito                                                                                                                                           |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF001 | Atualizar a localização real a cada 5 minutos. Para uma experiência de rastreamento útil, avaliar atualização entre 10 e 30 segundos.               |
| RNF002 | Proteger credenciais em repouso e usar TLS 1.3 em trânsito. A formulação original cita SHA-256 como “criptografia”; ver a nota de segurança abaixo. |
| RNF003 | Cumprir a LGPD e proteger a confidencialidade dos dados pessoais.                                                                                   |
| RNF004 | Realizar backups automáticos a cada 24 horas.                                                                                                       |
| RNF005 | Ser compatível com Android 10 ou superior.                                                                                                          |
| RNF006 | Ser compatível com iOS 15 ou superior.                                                                                                              |
| RNF007 | Suportar 500 conexões simultâneas de responsáveis rastreando veículos sem degradação do serviço.                                                    |
| RNF008 | Oferecer ao motorista botões grandes e modo noturno de alto contraste, reduzindo distrações durante a direção.                                      |

### Nota de segurança sobre RNF002

SHA-256 é uma função de hash, não criptografia, e um hash simples não é
apropriado para armazenar senhas. A implementação deve usar um algoritmo de
hash de senhas com salt e custo configurável, como Argon2id, scrypt, bcrypt ou
PBKDF2, conforme a plataforma e a política de segurança. TLS 1.3 protege os
dados em trânsito; dados pessoais em repouso também exigem controles de acesso
e, quando aplicável, criptografia apropriada.

## Escopo futuro

- Aba de perguntas frequentes.
- Registro online de reclamações e feedback.
- Implementação de tokens de autenticação.
- Recursos de acessibilidade, incluindo suporte a pessoas cegas.

## Estado deste protótipo

O painel do aluno oferece controles demonstrativos de aviso de ausência,
lembrete de proximidade e QR Code de embarque. O QR contém apenas um identificador
de demonstração e não confirma presença. As alterações de ausência e os
lembretes ficam somente no estado local da tela.

A tela de cadastro cria contas apenas em memória para demonstrar o fluxo de
acesso ao painel. Essas contas deixam de existir ao recarregar a aplicação e
não representam autenticação ou armazenamento seguro de credenciais.

O projeto ainda não conecta esses controles a uma API, a uma rota real, a
notificações do sistema, a uma câmera/leitor de QR ou a um serviço de localização.
Também não implementa autenticação de embarque, biometria, sincronização entre
perfis, persistência, backups ou infraestrutura para as metas de escala e
compatibilidade móvel. As telas e os horários existentes devem ser tratados
como dados ilustrativos até essas integrações e seus testes serem implementados.
