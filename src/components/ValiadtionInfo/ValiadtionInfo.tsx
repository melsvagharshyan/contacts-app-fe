import { FieldApi } from '@tanstack/react-form';

function ValidationInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="text-red-500 text-xs text-start">{field.state.meta.errors.join(',')}</p>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

export default ValidationInfo;
