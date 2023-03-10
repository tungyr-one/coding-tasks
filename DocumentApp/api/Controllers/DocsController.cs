using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using api.DTOs;

namespace api.Controllers
{
   [ApiController]
   [Route("api/[controller]")]
   public class DocsController : ControllerBase
   {
      private readonly IDocsService _docsService;

      public DocsController(IDocsService docsService)
      {
         _docsService = docsService;
      }

        ///<summary>
        /// Gets document from service, if null returns NotFound
        ///</summary>
      [HttpGet("{id}")]
      public async Task<ActionResult<DocDto>> GetDoc(int id)
      {
         return await _docsService.GetDocAsync(id) switch
         {
            null => NotFound(),
            var doc => Ok(doc)
         };
      }

        ///<summary>
        /// Gets documents list
        ///</summary>
      [HttpGet]
      public async Task<ActionResult<DocDto>> GetDocs()
      {
         var docs = await _docsService.GetDocsAsync();
         return Ok(docs);
      }

        ///<summary>
        /// Creates document 
        ///</summary>
      [HttpPost]
      public async Task<ActionResult> CreateDocAsync(DocNewDto newDoc)
      {
         if (await _docsService.CreateAsync(newDoc)) return Ok();
         return BadRequest("Failed to create document");
      }

        ///<summary>
        /// Updates document 
        ///</summary>
      [HttpPut("{id}")]
      public async Task<ActionResult> UpdateDocAsync(int id, DocUpdateDto DocUpdate)
      {
         if (await _docsService.UpdateAsync(id, DocUpdate)) return NoContent();
         return BadRequest("Failed to update document");
      }

        ///<summary>
        /// Deletes document
        ///</summary>
      [HttpDelete("{id}")]
      public async Task<ActionResult> DeleteDocAsync(int id)
      {
         if (await _docsService.DeleteAsync(id)) return Ok();
         return BadRequest("Failed to delete document");
      }
   }
}