I. Aplicatia de Node.js foloseste Express si expune 4 endpointuri:
	1. register
	2. login
	3. logout
	4. health check
	
II. Pentru instanta de DB:
	1. Datele sunt stocate in PostreSQL in format tabular
	
III. Serverul de Nginx serveste static content. Acest content este un build a unei aplicatii de React. Aplicatia indeplineste urmatoarele reguli:
	1. Se incarca doar daca ruta de healthcheck returneaza 200 OK. In caz contrar, un loading spinner este afisat.
	2. Poti ajunge pe o pagina X doar daca ai trecut de Login
	
	De asemenea campurile de intrare contin validari:
		1. Parola sa aiba minim 6 caractere
		2. Exista un camp suplimentar la inregistrare numit "Cofirm password" care trebuie sa aiba aceeasi valoare ca si campul "Password"
		3. Email-ul trebuie sa fie unic (sa nu existe alt cont cu aceeasi adresa de email).
		
		
Pentru deployment am incercat crearea unei instante de docker-compose care sa porneasca 3 instante:
    - Una de DB 
    - Una de Node.js
    - Una de Nginx.
Instanta de Node.js nu porneste.
Local, aplicatia backend ruleaza pe portul 4000 iar aplicatia frontend ruleaza pe portul 3000. (http://localhost:3000)
Pentru pornirea aplicatiei local, trebuie executat npm start atat in folderul my_frontend cat si in my_backend.


In dezvoltarea aplicatiei, am folosit git. Repository-ul poate fi gasit la: https://github.com/AndreiBisoc/healthCheck
