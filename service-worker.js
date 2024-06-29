if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
          console.log('Service Worker registrado com sucesso:', registration);
        }, function(error) {
          console.log('Falha ao registrar o Service Worker:', error);
        });

        navigator.serviceWorker.addEventListener('message', function(event) {
          if (event.data === 'cached') {
            document.getElementById('message').textContent = 'O conteúdo foi salvo no cache!';
          }
        });
      });
    }