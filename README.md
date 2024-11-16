# 🧑🏻‍⚕️ ClinicalManagement

Backend application using Nest for clinics manage their appointments

# 💻 Como executar o projeto?

1. Execute o comando yarn install
2. Certifiqui-se que o Docker está instalado em sua máquina
3. Crie um arquivo `.env` na raiz do projeto adicionando o conteúdo presente em `src/doc/env.example`
4. A depender do seu S.O os scripts `yarn build:docker` e `yarn start:docker` devem ser adaptados
5. Execute o comando `yarn build:docker`
6. Execute o comando `yarn start:docker`
7. A url de acesso do backend será `http://0.0.0.0:3001`
8. A url de acesso a documentação do `Swagger` é `http://0.0.0.0:3001/api`

# 💡 Por que o CRUD de clientes foi adicionado?

Ao criar uma nova consulta a inserção de um cliente é sempre necessária. Logo, é comum que mais de uma consulta para um mesmo cliente. A fim, de evitar o retrabalho de digitar todas as informações do cliente novamente a cada nova consulta e um volume de dados repetidos no banco de dados, esta feature foi desenvolvida.

# ✅ Itens válidos a serem acrescentados:

- Validações extras
- Testes unitários e de integração
- Continuos Integration
- Reativação de cliente
- Tabela de usuario
- Paginação na tela de usuários
- Página de Estatística
- Ao cadastrar uma consulta recorrente adicionar um rollback no processo caso, algum registro falhe
- Filtros para pesquisa
