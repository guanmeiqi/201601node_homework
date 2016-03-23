$(function() {


	$("#getBtn").on('click', function() {

		$.ajax({
			url: '/reg',
			type: 'GET',
			success: function(data) {

				console.log(data);
				alert(JSON.stringify(data));

			}
		})

	})

	$("#postBtn").on('click', function() {

		$.ajax({
			url: '/reg',
			type: 'POST',
			success: function(data) {

				console.log(data);
				alert(JSON.stringify(data));

			}
		})

	})


})