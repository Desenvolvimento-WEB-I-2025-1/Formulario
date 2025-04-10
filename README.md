# Formulário de Cadastro

## Descrição
Sistema de formulário de cadastro responsivo com validações em tempo real, máscaras de input e feedback visual moderno. Utiliza notificações toast em vez de alertas tradicionais para melhor experiência do usuário.

## Funcionalidades

- **Validação em tempo real** de todos os campos do formulário
- **Máscaras de formatação** para CPF, telefones e CEP
- **Consulta automática de CEP** via API ViaCEP
- **Indicador de força de senha** com feedback visual
- **Seção adicional para menores de idade**
- **Notificações toast** modernas no lugar de alertas padrão
- **Modal de confirmação** de envio
- **Design responsivo** para todos os dispositivos
- **Feedback visual claro** para erros e sucessos
- **Animações e transições** suaves

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS para tema consistente)
- JavaScript puro (Vanilla JS)
- Font Awesome para ícones
- API ViaCEP para consulta de endereços
- Google Fonts (Roboto)

## Estrutura do Projeto

- **index.html** - Estrutura do formulário com seções organizadas
- **styles.css** - Estilos, incluindo tema, animações e componentes
- **script.js** - Lógica de validação e interatividade
- **mascaras.js** - Funções para formatação de campos específicos

## Como Funciona

### Sistema de Validação
O sistema realiza validações em tempo real nos campos:
- Nome completo (verifica se possui nome e sobrenome)
- Data de nascimento (com verificação de idade)
- CPF (com algoritmo de validação completo)
- Telefones (fixo e celular)
- CEP e endereço
- Email (formato válido)
- Senha (com indicador de força)

### Sistema de Notificações
Implementa notificações toast modernas com:
- Diferentes tipos: sucesso, erro, aviso e informação
- Ícones contextuais
- Animações de entrada e saída
- Remoção automática após tempo configurável

### Modal de Sucesso
Após envio bem-sucedido, exibe um modal de confirmação estilizado em vez de um alerta padrão.

### Integração com API
Consulta automaticamente o CEP informado na API ViaCEP e preenche os campos de endereço.

## Detalhes de Implementação

### CSS
- Uso de variáveis CSS para manter consistência visual
- Design responsivo com media queries
- Animações suaves para melhorar experiência do usuário
- Feedback visual para estados de validação

### JavaScript
- Estrutura modular com funções específicas para cada validação
- Sistema de máscaras para formatação em tempo real
- Gestão centralizada de mensagens de erro
- Sistema próprio de notificações toast
- Validações específicas para cada tipo de campo

## Como Usar

1. Abra o arquivo index.html em um navegador
2. Preencha os campos do formulário
3. Observe as validações em tempo real
4. Envie o formulário para ver o modal de sucesso

---

Desenvolvido com foco em UX/UI e boas práticas de desenvolvimento web. 