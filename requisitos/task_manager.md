### Levantamento Detalhado de Requisitos para o "App de Gerenciamento de Tarefas"

#### I. Requisitos Funcionais (RF)

Os requisitos funcionais descrevem o que o sistema deve fazer.

**A. Gerenciamento de Usuários e Autenticação**

- **RF.1.1 - Registro de Usuário:** O sistema deve permitir que novos usuários se registrem fornecendo nome completo, endereço de e-mail e uma senha.
- **RF.1.2 - Login de Usuário:** O sistema deve permitir que usuários registrados façam login utilizando seu endereço de e-mail e senha.
- **RF.1.3 - Recuperação de Senha:** O sistema deve oferecer um mecanismo para que os usuários possam recuperar ou redefinir suas senhas em caso de esquecimento (e.g., via e-mail).
- **RF.1.4 - Autenticação Segura:** O sistema deve autenticar os usuários de forma segura, utilizando JSON Web Tokens (JWT) para gerenciar sessões e acesso.

**B. Gerenciamento de Tarefas**

- **RF.2.1 - Criação de Tarefa:** O usuário deve ser capaz de criar uma nova tarefa, especificando os seguintes atributos:
  - Título (obrigatório)
  - Descrição (opcional)
  - Data de Vencimento (opcional)
  - Prioridade (e.g., Baixa, Média, Alta)
  - Tags (opcional)
- **RF.2.2 - Edição de Tarefa:** O usuário deve ser capaz de modificar todos os atributos de uma tarefa existente.
- **RF.2.3 - Visualização de Tarefas:** O usuário deve ser capaz de visualizar uma lista de todas as suas tarefas.
- **RF.2.4 - Detalhes da Tarefa:** O usuário deve ser capaz de acessar uma tela de detalhes para visualizar todas as informações de uma tarefa específica.
- **RF.2.5 - Marcação de Conclusão:** O usuário deve ser capaz de marcar uma tarefa como concluída ou reabri-la (marcar como não concluída).
- **RF.2.6 - Exclusão de Tarefa:** O usuário deve ser capaz de excluir uma tarefa permanentemente.

**C. Organização e Filtragem de Tarefas**

- **RF.3.1 - Categorias/Listas Personalizáveis:** O usuário deve ser capaz de criar, nomear e gerenciar categorias ou listas personalizadas para agrupar e organizar suas tarefas.
- **RF.3.2 - Filtragem de Tarefas:** O usuário deve ser capaz de filtrar a exibição de tarefas com base nos seguintes critérios:
  - Data de vencimento (e.g., hoje, esta semana, futuras, atrasadas)
  - Prioridade (e.g., alta, média, baixa)
  - Status (concluídas, pendentes)
  - Categorias/Listas
  - Tags
- **RF.3.3 - Pesquisa de Tarefas:** O usuário deve ser capaz de pesquisar tarefas por palavras-chave presentes no título ou na descrição.

**D. Lembretes e Notificações**

- **RF.4.1 - Configuração de Lembretes:** O usuário deve ser capaz de configurar lembretes para tarefas específicas, com data e hora personalizáveis.
- **RF.4.2 - Notificações Push:** O sistema deve enviar notificações push para o dispositivo do usuário para alertá-lo sobre prazos próximos e lembretes configurados.

**E. Colaboração (Opcional, mas detalhada na apresentação)**

- **RF.5.1 - Compartilhamento de Tarefas:** O usuário deve ser capaz de compartilhar tarefas individuais com outros usuários do aplicativo.
- **RF.5.2 - Atribuição de Tarefas:** O usuário deve ser capaz de atribuir tarefas a outros membros da equipe ou usuários com quem a tarefa foi compartilhada.
- **RF.5.3 - Comentários em Tarefas:** O sistema deve permitir que os usuários adicionem e visualizem comentários em tarefas compartilhadas ou atribuídas.

**F. Visualização do Progresso e Relatórios**

- **RF.6.1 - Gráficos de Produtividade:** O sistema deve exibir gráficos e relatórios visuais que demonstrem o progresso e a produtividade do usuário (e.g., número de tarefas concluídas por período, distribuição de prioridades).
- **RF.6.2 - Visão Geral do Status:** O sistema deve fornecer uma visão geral consolidada do status das tarefas (e.g., contagem de tarefas pendentes, concluídas, atrasadas).

**G. Navegação e Interface**

- **RF.7.1 - Navegação Principal:** O aplicativo deve possuir uma barra de navegação inferior com acesso rápido às seções principais: Tarefas, Projetos, Relatórios e Configurações.
- **RF.7.2 - Interface Intuitiva:** A interface do usuário deve ser projetada para ser intuitiva e fácil de usar, minimizando a curva de aprendizado.

#### II. Requisitos Não Funcionais (RNF)

Os requisitos não funcionais descrevem como o sistema deve funcionar (qualidade, desempenho, segurança, etc.).

**A. Usabilidade**

- **RNF.1.1 - Intuitividade:** O aplicativo deve ser fácil de usar e compreender para o público-alvo, com um fluxo de usuário lógico e claro.
- **RNF.1.2 - Consistência:** A interface do usuário e a experiência de interação devem ser consistentes em todas as telas e funcionalidades.
- **RNF.1.3 - Feedback Visual:** O aplicativo deve fornecer feedback visual adequado ao usuário para cada ação realizada (e.g., carregamento, sucesso, erro).

**B. Desempenho**

- **RNF.2.1 - Tempo de Resposta:** As operações críticas (e.g., carregamento da lista de tarefas, criação/edição de tarefas, login) devem ter um tempo de resposta rápido, idealmente inferior a 2 segundos.
- **RNF.2.2 - Escalabilidade:** O sistema deve ser capaz de suportar um número crescente de usuários e tarefas sem degradação significativa do desempenho.

**C. Segurança**

- **RNF.3.1 - Proteção de Dados:** Todos os dados do usuário, incluindo informações pessoais e detalhes das tarefas, devem ser armazenados e transmitidos de forma segura (e.g., criptografia em trânsito e em repouso).
- **RNF.3.2 - Autenticação Robusta:** O mecanismo de autenticação deve ser robusto para prevenir acessos não autorizados e ataques comuns (e.g., força bruta).
- **RNF.3.3 - Autorização:** O sistema deve garantir que os usuários só possam acessar e modificar suas próprias tarefas, ou tarefas que foram explicitamente compartilhadas ou atribuídas a eles.

**D. Confiabilidade**

- **RNF.4.1 - Disponibilidade:** O aplicativo e seus serviços de backend devem estar disponíveis para os usuários com alta porcentagem de tempo (e.g., 99.9% de uptime).
- **RNF.4.2 - Recuperação de Falhas:** O sistema deve ser capaz de se recuperar de falhas de forma graciosa, minimizando a perda de dados e o impacto na experiência do usuário.

**E. Manutenibilidade**

- **RNF.5.1 - Código Limpo e Documentado:** O código-fonte deve ser bem estruturado, modular, legível e adequadamente documentado para facilitar futuras manutenções, atualizações e novos desenvolvimentos.
- **RNF.5.2 - Testabilidade:** O sistema deve ser projetado de forma a facilitar a escrita e execução de testes automatizados (unitários, de integração, de UI).

**F. Compatibilidade**

- **RNF.6.1 - Multiplataforma:** O aplicativo deve ser totalmente funcional e ter uma experiência de usuário consistente em dispositivos iOS e Android.
- **RNF.6.2 - Versões de SO:** O aplicativo deve ser compatível com as versões mais recentes dos sistemas operacionais iOS e Android, bem como com as duas versões anteriores.

#### III. Requisitos Técnicos (RT)

Os requisitos técnicos especificam as tecnologias e a arquitetura a serem utilizadas.

- **RT.1 - Frontend:** O aplicativo móvel será desenvolvido utilizando **React Native** para garantir compatibilidade nativa com iOS e Android.
- **RT.2 - Backend:** A API RESTful será desenvolvida utilizando **Node.js** com o framework **Express.js**.
- **RT.3 - Banco de Dados:** Será utilizado **MongoDB** como banco de dados NoSQL para flexibilidade e escalabilidade no armazenamento de dados das tarefas e usuários.
- **RT.4 - Autenticação:** A autenticação de usuários será implementada utilizando **JSON Web Tokens (JWT)**.
- **RT.5 - Hospedagem:** A hospedagem do backend e outros serviços de nuvem (e.g., notificações push) será realizada utilizando **Firebase**.

---

### Sugestões para Melhoria e Clarificação

Para refinar ainda mais o projeto, sugiro considerar os seguintes pontos:

1.  **Detalhes da Seção "Projetos":** A navegação inferior inclui "Projetos", mas não há funcionalidades detalhadas sobre o que um "Projeto" representa. Seria uma coleção de tarefas? Terá seu próprio status, membros e prazos? Definir isso ajudaria a expandir as funcionalidades de colaboração e organização.
2.  **Gerenciamento de Tags:** Como as tags serão criadas e gerenciadas? O usuário poderá criar tags livremente, ou haverá um conjunto predefinido? Será possível visualizar todas as tags existentes e gerenciar sua exclusão/edição?
3.  **Tipos de Lembretes:** Além de lembretes baseados em data/hora, o aplicativo oferecerá lembretes recorrentes (diários, semanais, mensais)? Isso pode ser um diferencial importante para tarefas rotineiras.
4.  **Contradição Tecnológica (MongoDB vs. Firebase DB):** A apresentação menciona MongoDB como banco de dados e Firebase para hospedagem de backend e banco de dados em nuvem. É importante esclarecer se o MongoDB será hospedado separadamente (e.g., MongoDB Atlas) e o Firebase usado para o Node.js/Express e notificações, ou se há a intenção de usar um dos bancos de dados do Firebase (Firestore ou Realtime Database) em vez do MongoDB. Uma decisão clara aqui evitará complexidade desnecessária.
5.  **Modo Offline:** O aplicativo terá alguma funcionalidade offline, permitindo que os usuários visualizem e talvez até criem/editem tarefas que serão sincronizadas quando a conexão for restabelecida? Isso é crucial para a usabilidade em ambientes com conectividade limitada.
