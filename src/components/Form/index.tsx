import { memo } from "react"
import * as S from "./styled"
import Input from "../Inpts"

import { TForm } from "../../utils/@types/components/Form"
import { FormField } from "../../utils/@types/components/FormFields"

type Props = TForm

const getElement = (
  field: FormField,
  handleField: Props["handleField"],
  key: number
) => {
  switch (field.type) {
    case "default":
      return <Input.Default {...field} onChange={handleField} key={key} />
    case "date":
      return <Input.Date {...field} onChange={handleField} key={key} />
    case "readonly":
      return <Input.Readonly {...field} onChange={handleField} key={key} />
    case "select":
      return (
        <Input.Select
          {...field}
          zIndex={50 - (key + 1)}
          onChange={handleField}
          key={key}
        />
      )
    default:
      return null
  }
}

const Form = ({ handleField, columns, size }: Props) => {
  const renderInput = (field: FormField, key: number) => {
    return getElement(field, handleField, key) ?? null
  }

  return (
    <S.Content $size={size}>
      <S.BlocksArea>
        {columns.map((column, columnKey) => (
          <S.BlockCols key={columnKey}>
            {column.blocks.map((block, blockKey) => (
              <S.Block
                key={blockKey}
                $zIndex={50 + (column.blocks.length + 2 - blockKey)}
                $mobileZIndex={
                  50 + (column.blocks.length + 2 - blockKey) - columnKey
                }
              >
                <S.BlockTitle>{block.title}</S.BlockTitle>

                {block.groups.map((group, gKey) => (
                  <div
                    key={gKey}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      zIndex: 50 - (gKey + 1),
                    }}
                  >
                    <S.BlockTitle>{group.title}</S.BlockTitle>
                    <S.GroupArea>
                      <S.FormArea>
                        {group.type === "custom"
                          ? group.element
                          : group.fields.map((line, k) =>
                              Array.isArray(line) ? (
                                <S.FormLine
                                  key={k}
                                  $k={k}
                                  $columns={group.columns}
                                  $align={
                                    group.centeredLines &&
                                    group.centeredLines.includes(k + 1)
                                      ? "center"
                                      : undefined
                                  }
                                >
                                  {line.map((f, fKey) => renderInput(f, fKey))}
                                </S.FormLine>
                              ) : (
                                <S.FormLine
                                  $k={k}
                                  key={k}
                                  $columns={group.columns}
                                >
                                  {renderInput(line, k)}
                                </S.FormLine>
                              )
                            )}
                      </S.FormArea>
                    </S.GroupArea>
                  </div>
                ))}
              </S.Block>
            ))}
          </S.BlockCols>
        ))}
      </S.BlocksArea>
    </S.Content>
  )
}

export default memo(Form)
