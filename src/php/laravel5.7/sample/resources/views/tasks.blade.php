@extends('layout')
@section('content')

<h1>Task List</h1>
<form action="/tasks" method="POST">
  <input type="text" name="name" id="task-name">
</form>

<h2>Current Tasks</h2>
<table>
  <thead>
    <th>Task</th><th>&nbsp;</th>
  </thead>
  <tbody>
    @foreach ($task as $tasK)
      <tr>
        {{ $task->name}}
      </tr>
      <td>
        <form action="/tasks/{{$task->id}}" method="POST">
          <button>Delete Task</button>
        </form>
      </td>
    @endforeach
  </tbody>
</table>
@endsection
