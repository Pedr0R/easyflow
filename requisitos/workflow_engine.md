---

# Documento de Requisitos: Criador/Gestor Dinâmico de Processos

Este documento detalha o escopo de um sistema SaaS *multi-tenant* focado na criação e gestão personalizada de fluxos de trabalho (Workflows), permitindo que organizações modelem seus próprios processos internos com regras de negócio e campos dinâmicos.

---

## 1. Visão Geral do MVP

O objetivo do MVP é permitir que um **Dono de Organização** possa:

1. Criar um fluxo de trabalho do zero.
2. Definir etapas sequenciais ou condicionais.
3. Criar campos de entrada de dados para cada etapa.
4. Atribuir usuários e funções para gerir esses processos.

---

## 2. Estrutura de Entidades e Atributos

### 2.1. Núcleo de Identidade (RBAC)

* **Organização (Tenant):**
* `id`: UUID (Primary Key)
* `nome`: String (Nome da empresa/instituição)
* `slug`: String (Ex: `minha-empresa.gestor.com`)
* `ativo`: Boolean


* **Funções/Atribuições (Roles):**
* `id`: UUID
* `org_id`: Foreign Key (Organização)
* `nome`: String (Ex: Gerente, Analista, Solicitante)
* `permissoes_json`: JSON (Permissões de sistema: Criar Fluxo, Deletar Usuário, etc.)


* **Usuários:**
* `id`: UUID
* `org_id`: Foreign Key
* `funcao_id`: Foreign Key (Vínculo com a Função)
* `nome`: String


* **Credenciais**
* `id`: UUID
* `usuario_id`: Foreign Key
* `email`: String (Unique)
* `senha_hash`: String


### 2.2. Motor de Workflow (Engine)

* #### **Fluxos/Processos:**
* `id`: UUID
* `org_id`: Foreign Key
* `nome`: String (Ex: Reembolso de Despesas)
* `descricao`: Text
* `versao`: Integer (Controle de versionamento do fluxo)
* `conteudo_json`: JSON (Conteudo salvo durante as etapas)


* #### **Etapas:**
* `id`: UUID
* `fluxo_id`: Foreign Key
* `titulo`: String (Ex: Aprovação de Gestor)
* `ordem`: Integer
* `funcao_responsavel_id`: Foreign Key (Qual cargo pode interagir nesta etapa)


* #### **Campos (Inputs Dinâmicos):**
* `id`: UUID
* `etapa_id`: Foreign Key
* `label`: String (Ex: "Valor do Gasto")
* `tipo`: Enum (Texto, Número, Data, Arquivo, Seleção)
* `obrigatorio`: Boolean
* `opcoes_json`: JSON (Para campos de seleção)


* #### **Condicionais (Lógica de Desvio):**
* `id`: UUID
* `etapa_origem_id`: Foreign Key
* `campo_gatilho_id`: Foreign Key (O campo que será validado)
* `operador`: Enum (>, <, ==, !=, contém)
* `valor_comparacao`: String
* `etapa_destino_id`: Foreign Key



---

## 3. Requisitos Funcionais (RF)

### RF01: Gestão de Multi-tenancy

O sistema deve garantir o isolamento total de dados. Um usuário da Organização A jamais poderá visualizar processos da Organização B.

### RF02: Construtor de Fluxos (Workflow Builder)

O usuário Admin deve ser capaz de criar etapas e definir a ordem de execução.

* **Nota:** No MVP, as etapas podem ser lineares, com as **Condicionais** servindo apenas para saltar etapas ou redirecionar.

### RF03: Formulários Dinâmicos

Cada etapa deve apresentar um formulário baseado nos **Campos** cadastrados. O sistema deve validar os tipos de dados (ex: não permitir texto em campo de número) antes de permitir o avanço para a próxima etapa.

### RF04: Motor de Regras (Condicionais)

Ao finalizar uma etapa, o sistema deve avaliar as **Condicionais**.

* *Exemplo:* Se o campo "Valor" na Etapa 1 for `> 5000`, a Etapa Destino será "Aprovação Diretoria". Caso contrário, segue para "Pagamento".

### RF05: Atribuição por Função

As tarefas de uma etapa não são destinadas a uma pessoa específica, mas sim à **Função** (ex: todos que são "Analistas Financeiros" visualizam o processo que chegou nessa etapa).

---

## 4. Requisitos Não-Funcionais (RNF)

* **Auditabilidade:** Todas as mudanças de etapa devem ser registradas em uma tabela de logs (Quem, Quando e O que mudou).
* **Escalabilidade:** O banco de dados deve ser modelado para suportar o crescimento do número de organizações sem degradação de performance.
* **Interface:** Deve ser intuitiva (estilo Kanban ou Lista de Tarefas) para facilitar a adoção por usuários não-técnicos.

---

## 5. Fluxo de Trabalho do Usuário (User Journey)

1. **Configuração:** O Admin cria a Organização e as Funções (RH, Financeiro, Direção).
2. **Modelagem:** O Admin cria o Fluxo "Contratação", define as Etapas, os Campos de cada uma e as Condicionais de aprovação.
3. **Execução:** Um usuário inicia um novo processo. O sistema gera a primeira etapa.
4. **Movimentação:** Ao preencher os campos e "Enviar", o sistema valida as regras e move o processo para a fila da Função responsável pela próxima etapa.

---

**Este documento está alinhado com o que você imaginou para a estrutura do sistema? Se sim, o próximo passo ideal seria eu gerar o Script SQL (DDL) para criar essas tabelas com os relacionamentos corretos.**