Dim A = New Integer() {1, 2, 3, 4, 5, 6}
Dim sum As Integer
Dim i As Integer

i = 0

Do Until i <= 6
	If A(i) mod 2 = 1 Then
		sum = sum + i
		i = i + 1
	End If
Loop

Console.WriteLine("Sum of odd number: " & sum)



Dim A = New Integer() {1, 2, 3, 4, 5, 6}
Dim sum As Integer
Dim i As Integer

For i = 0 to 6 Step 1
	If A(i) mod 2 = 1 Then
		sum = sum + i
	End If
Next

Console.WriteLine("Sum of odd number: " & sum)



Module CompoundInterest
	Sub Main(args As String())
	'Declaring variables
		Dim t As Integer
		Dim P As Double
		Dim r As Double
		Dim cp As Decimal
		
		'Asking input
		Console.WriteLine("Input Pricinpal, Interest rate, Time(in hours): ");
		Console.ReadLine(P)
		Console.WriteLine(r)
		Console.WriteLine(t)

		Dim time As Integer = t*60*60 //Leaving it in seconds
		
		cp = P*(1+r)^time-P
		
		'Giving output results
		Console.WriteLine("The compound interest is: " & cp)
	End Sub
End Module
		
