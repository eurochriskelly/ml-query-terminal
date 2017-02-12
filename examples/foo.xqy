xquery version "1.0-ml";

let $stub := '/foo-hd78ade-'
let $fn-create-files := function () {
	(1, 2, 3) ! xdmp:document-insert(
		$stub || xs:string(.) || '.xml',
		<foo>{.}</foo>
	)
}
let $fn-count-files := function () {
	fn:count(cts:uri-match($stub || '*xml'))
}
let $fn-delete-files := function () {
	for $x in cts:uri-match($stub || '*xml')
	let $_ := xdmp:document-delete($x)
	return ()
}
let $fn-message := function () {
	'expect 3 and then 0'
}
return (
	$fn-create-files,
	$fn-count-files,
	$fn-delete-files,
	$fn-count-files,
	$fn-message
	) ! xdmp:invoke-function(., <options xmlns="xdmp:eval">
	<transaction-mode>update-auto-commit</transaction-mode>
	<isolation>different-transaction</isolation>
	</options>)
