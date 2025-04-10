// Funções de máscara para os campos do formulário
const mascaras = {
    // Máscara para CPF: 000.000.000-00
    cpf: function(el) {
        let valor = el.value.replace(/\D/g, '');
        
        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }
        
        if (valor.length > 9) {
            valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        } else if (valor.length > 6) {
            valor = valor.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
        } else if (valor.length > 3) {
            valor = valor.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
        }
        
        el.value = valor;
    },
    
    // Máscara para telefone fixo: (00) 0000-0000
    telefoneFixo: function(el) {
        let valor = el.value.replace(/\D/g, '');
        
        if (valor.length > 10) {
            valor = valor.substring(0, 10);
        }
        
        if (valor.length > 6) {
            valor = valor.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d{0,4})$/, '($1) $2');
        } else if (valor.length > 0) {
            valor = valor.replace(/^(\d{0,2})$/, '($1');
        }
        
        el.value = valor;
    },
    
    // Máscara para celular: (00) 00000-0000
    celular: function(el) {
        let valor = el.value.replace(/\D/g, '');
        
        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }
        
        if (valor.length > 7) {
            valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else if (valor.length > 0) {
            valor = valor.replace(/^(\d{0,2})$/, '($1');
        }
        
        el.value = valor;
    },
    
    // Máscara para CEP: 00000-000
    cep: function(el) {
        let valor = el.value.replace(/\D/g, '');
        
        if (valor.length > 8) {
            valor = valor.substring(0, 8);
        }
        
        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
        }
        
        el.value = valor;
    }
};

// Exportar as máscaras para uso em outros arquivos
window.mascaras = mascaras; 